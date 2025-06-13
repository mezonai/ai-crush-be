import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../types/response.dto';
import { UserService } from '@/modules/user/user.service';
import { UserDetailDto } from '@/modules/user/types/response.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const secret = configService.get<string>('auth.jwt.secretKey');
    if (!secret) {
      throw new Error('JWT secret is not defined');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDetailDto> {
    const { exp, email, userId } = payload;
    const remainingTime = exp * 1000 - Date.now();
    if (remainingTime <= 0) {
      throw new UnauthorizedException('Access token has expired');
    }

    const user = await this.userService.getUserById(userId);
    if (!user || user.email !== email) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
