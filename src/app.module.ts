import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from './config/env-path.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from './config/data-source.config';
import { UserModule } from './features/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    UserModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
