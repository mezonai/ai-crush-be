import { AuthEnv } from '@/types/env';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): AuthEnv => ({
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY ?? '',
      accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '',
      refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ?? '',
    },
  }),
);
