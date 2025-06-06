// This file seeds data for local development and testing only.
import { DataSource } from 'typeorm';
import { seedCharacterData } from './character.seed';
import { AppModule } from '../../app.module';
import { NestFactory } from '@nestjs/core';

async function runSeeder() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  await seedCharacterData(dataSource);
  await app.close();
}
runSeeder();
