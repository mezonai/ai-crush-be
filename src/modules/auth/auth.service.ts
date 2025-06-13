import { forwardRef, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginMezonHashRequestDto } from './types/request.dto';
import { ConfigService } from '@nestjs/config';
import { verifyMezonHash } from '@/utils/hash';
import { JwtConfigEnv, MezonEnv } from '@/types/env';
import { JwtPayload, JWTResponseDto } from './types/response.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDetailIncludeRefreshTokenDto } from '../user/types/response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public generateToken(userId: string, email: string) {
    const accessToken = this.jwtService.sign(
      { userId, email },
      { expiresIn: this.configService.get<JwtConfigEnv>('auth.jwt')!.accessTokenExpiresIn },
    );
    const refreshToken = this.jwtService.sign(
      { userId, email },
      { expiresIn: this.configService.get<JwtConfigEnv>('auth.jwt')!.refreshTokenExpiresIn },
    );
    return { accessToken, refreshToken };
  }

  async loginMezon(payload: LoginMezonHashRequestDto): Promise<JWTResponseDto> {
    const { web_app_data } = payload;
    const mezonConfig = this.configService.get<MezonEnv>('mezon');
    const { appToken, expiresTimeOffset } = mezonConfig as MezonEnv;

    const { userMezon } = verifyMezonHash(web_app_data, appToken, Number(expiresTimeOffset));
    const { id: identityId, mezon_id: email } = userMezon;
    const user = await this.userService.getUserByIdentity(identityId);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const { id: userId } = user;
    const { accessToken, refreshToken } = this.generateToken(userId, email);
    await this.userService.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken } as JWTResponseDto;
  }

  async refreshToken(req: Request): Promise<JWTResponseDto> {
    const presentedRefreshToken = this.getRefreshTokenFromHeaders(req);
    const user = await this.verifyRefreshToken(presentedRefreshToken);
    const { accessToken, refreshToken } = this.generateToken(user.id, user.email);
    await this.userService.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private getRefreshTokenFromHeaders(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return authHeader.replace('Bearer ', '').trim();
    }
    throw new UnauthorizedException('Refresh token is missing');
  }

  private async verifyRefreshToken(presentedRefreshToken: string): Promise<UserDetailIncludeRefreshTokenDto> {
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify<JwtPayload>(presentedRefreshToken);
    } catch {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const { exp, email, userId } = payload;
    if (!exp || !email || !userId) {
      throw new UnauthorizedException('Refresh token payload is invalid');
    }
    const remainingTime = exp * 1000 - Date.now();
    if (remainingTime <= 0) {
      throw new UnauthorizedException('Refresh token has expired');
    }

    const user = await this.userService.getUserWithRefreshTokenById(userId);
    if (!user || user.email !== email || user.refreshToken !== presentedRefreshToken) {
      throw new UnauthorizedException('User or refresh token not found');
    }

    return user;
  }
}
