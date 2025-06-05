import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './features/user/user.controller';
import { UserService } from './features/user/user.service';
import { envFilePath } from './config/env-path.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/data-source.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath
    }),
    TypeOrmModule.forRoot(dataSourceOption),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule { }
