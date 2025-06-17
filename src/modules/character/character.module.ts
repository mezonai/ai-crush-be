import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterRepository } from './character.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '@/database/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterService, CharacterRepository],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
