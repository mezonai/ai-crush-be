import { MezonEnv } from '@/types/env';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'mezon',
  (): MezonEnv => ({
    appToken: process.env.MEZON_APPLICATION_TOKEN ?? '3000',
    expiresTimeOffset: process.env.MEZON_AUTH_EXPIRES_TIME_OFFSET_IN_SECONDS ?? 10,
  }),
);
