import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/response.dto';
import { UserService } from '@/modules/user/user.service';
import { UserDetailIncludeRefreshTokenDto } from '@/modules/user/types/response.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.jwt.refresh.secret'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<UserDetailIncludeRefreshTokenDto> {
    const { exp, email, userId } = payload;
    const remainingTime = exp * 1000 - Date.now();
    if (remainingTime <= 0) {
      throw new UnauthorizedException('Refresh token has expired');
    }

    const authHeader = req.headers['authorization'];
    let refreshToken: string | undefined = undefined;
    if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      refreshToken = authHeader.replace('Bearer ', '').trim();
    }

    const user = await this.userService.getUserWithRefreshTokenById(userId);
    if (!user || user.email !== email || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return user;
  }
}
