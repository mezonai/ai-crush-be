import { Module } from '@nestjs/common';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterRepository } from './character.repository';

@Module({
  imports: [],
  providers: [CharacterService, CharacterRepository],
  controllers: [CharacterController],
  exports: [CharacterService],
})
export class CharacterModule {}
