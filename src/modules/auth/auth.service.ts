import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { LoginMezonHashRequestDto } from './types/request.dto';
import { ConfigService } from '@nestjs/config';
import { UserMezonData, WebAppData } from './types/auth.type';
import { generateMezonHash } from '@/utils/hash';
import { MezonEnv } from '@/types/env';
import { LoginMezonHashResponseDto } from './types/response.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

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

  private generateToken(identityId: string, email: string) {
    const accessToken = this.jwtAccessTokenService.sign({ identityId, email });
    const refreshToken = this.jwtRefreshTokenService.sign({ identityId, email });
    return { accessToken, refreshToken };
  }

  async verifyMezonHash(payload: LoginMezonHashRequestDto): Promise<LoginMezonHashResponseDto> {
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

    const user = await this.userService.checkUserExistByMezonId(identityId);
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    const { accessToken, refreshToken } = this.generateToken(identityId, email);
    return { accessToken, refreshToken } as LoginMezonHashResponseDto;
  }
}
