import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { configSwagger } from './config/swagger.config';
import helmet from 'helmet';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from '@/common/exceptions/http-exception.filter';
import { ReqLoggingInterceptor } from '@/common/interceptors/logger-interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.uncolorize(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ],
    }),
    cors: {
      origin: process.env.NODE_ENV === 'production' ? [process.env.APP_URL, process.env.APP_ADMIN_URL] : '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  } as NestApplicationOptions);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  configSwagger(app);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new ReqLoggingInterceptor());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();
