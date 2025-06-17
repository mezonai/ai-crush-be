import { BaseRepository } from '@/common/core/base.repository';
import { Character } from '@/database/entities/character.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { GetPaginatedCharactersRequestDto } from './types/request.dto';

@Injectable()
export class CharacterRepository extends BaseRepository {
  private characterRepository(entityManager?: EntityManager): Repository<Character> {
    return this.getRepository(Character, entityManager);
  }

  public async getPaginatedCharacters(
    userId: string,
    requestDto: GetPaginatedCharactersRequestDto,
  ): Promise<[Character[], number]> {
    const query = this.characterRepository()
      .createQueryBuilder('characters')
      .select([
        'characters.id',
        'characters.characterName',
        'characters.avatarUrl',
        'characters.level',
        'characters.unlockTokenAmount',
      ])
      .leftJoinAndSelect('characters.userCharacters', 'userCharacters', 'userCharacters.userId = :userId', { userId });

    if (requestDto.search) {
      query.andWhere('characters.characterName ILIKE :search', { search: `%${requestDto.search}%` });
    }

    if (requestDto.level) {
      query.andWhere('characters.level = :level', { level: requestDto.level });
    }

    query.orderBy('characters.characterName', 'DESC');

    if (requestDto.page && requestDto.limit > 0 && requestDto.limit !== -1) {
      query.skip((requestDto.page - 1) * requestDto.limit).take(requestDto.limit);
    }

    return query.getManyAndCount();
  }
}
