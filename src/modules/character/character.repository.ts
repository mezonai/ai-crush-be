import { BaseRepository } from '@/common/core/base.repository';
import { Character } from '@/database/entities/character.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class CharacterRepository extends BaseRepository {
  private characterRepository(entityManager?: EntityManager): Repository<Character> {
    return this.getRepository(Character, entityManager);
  }
}
