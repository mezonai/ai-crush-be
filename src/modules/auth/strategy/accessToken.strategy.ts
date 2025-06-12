import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/response.dto';
import { UserService } from '@/modules/user/user.service';
import { UserDetailDto } from '@/modules/user/types/response.dto';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.jwt.access.secret'),
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

    return user
  }
}
