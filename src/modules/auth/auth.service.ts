import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LoginMezonHashRequestDto } from './types/request.dto';
import { ConfigService } from '@nestjs/config';
import { UserMezonData, WebAppData } from './types/auth.type';
import { generateMezonHash } from '@/utils/hash';
import { MezonEnv } from '@/types/env';
import { JWTResponseDto } from './types/response.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDetailIncludeRefreshTokenDto } from '../user/types/response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @Inject('JWT_ACCESS_TOKEN_SERVICE')
    private readonly jwtAccessTokenService: JwtService,
    @Inject('JWT_REFRESH_TOKEN_SERVICE')
    private readonly jwtRefreshTokenService: JwtService,
  ) { }

  private generateToken(userId: string, email: string) {
    const accessToken = this.jwtAccessTokenService.sign({ userId, email });
    const refreshToken = this.jwtRefreshTokenService.sign({ userId, email });
    return { accessToken, refreshToken };
  }

  async loginMezon(payload: LoginMezonHashRequestDto): Promise<JWTResponseDto> {
    const { web_app_data } = payload;
    const mezonConfig = this.configService.get<MezonEnv>('mezon');
    const { appToken, expiresTimeOffset } = mezonConfig as MezonEnv;
    const { hash, user: userMezon, auth_date } = Object.fromEntries<WebAppData | any>(
      new URLSearchParams(decodeURIComponent(web_app_data)),
    ) as WebAppData;

    const { mezon_id: email, id: identityId } = JSON.parse(userMezon) as UserMezonData;
    const timeNow = new Date().getTime() / 1000;
    const timeOffset = Number(expiresTimeOffset);
    const isHashExpired = Number(auth_date) >= timeNow - timeOffset;

    const hashGenerate = generateMezonHash(web_app_data, appToken);
    if (hashGenerate !== hash || !isHashExpired) {
      throw new BadRequestException('Invalid hash');
    }

    const user = await this.userService.getUserByIdentity(identityId);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const { id: userId } = user;
    const { accessToken, refreshToken } = this.generateToken(userId, email);
    await this.userService.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken } as JWTResponseDto;
  }

  async refreshToken(user: UserDetailIncludeRefreshTokenDto): Promise<JWTResponseDto> {
    const { id: userId, email } = user;
    const { accessToken, refreshToken } = this.generateToken(userId, email);
    await this.userService.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }
}
