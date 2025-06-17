import { AuthEnv } from '@/types/env';
import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();

export default registerAs(
  'auth',
  (): AuthEnv => ({
    jwt: {
      access: {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME ?? '',
        secret: process.env.JWT_ACCESS_TOKEN_SECRET ?? '',
      },
      refresh: {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME ?? '',
        secret: process.env.JWT_REFRESH_TOKEN_SECRET ?? '',
      },
    },
  }),
);
