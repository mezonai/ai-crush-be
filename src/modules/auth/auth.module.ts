import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigEnv } from '@/types/env';
import authConfig from '@/config/env.config/auth.config';
import { JWTStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [forwardRef(() => UserModule), ConfigModule.forFeature(authConfig)],
  providers: [
    AuthService,
    JWTStrategy,
    {
      provide: 'JWT_ACCESS_TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<JwtConfigEnv>('auth.jwt')!;
        if (!jwt) throw new Error('JWT config is missing!');
        return new JwtService({
          secret: jwt.access.secret,
          signOptions: {
            expiresIn: jwt.access.expiresIn,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'JWT_REFRESH_TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        const jwt = configService.get<JwtConfigEnv>('auth.jwt')!;
        if (!jwt) throw new Error('JWT config is missing!');
        return new JwtService({
          secret: jwt.refresh.secret,
          signOptions: {
            expiresIn: jwt.refresh.expiresIn,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
