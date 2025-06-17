import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import DatabaseModule from '@/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import mezonConfig from './config/env.config/mezon.config';
import { CharacterModule } from './modules/character/character.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [mezonConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CharacterModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
