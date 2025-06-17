import { Injectable } from '@nestjs/common';
import { CharacterRepository } from './character.repository';
import { CharacterListItemResponseDto } from './types/response.dto';
import { GetPaginatedCharactersRequestDto } from './types/request.dto';
import { plainToInstance } from 'class-transformer';
import { USER_CHARACTER_STATUS } from '@/common/types/common';

@Injectable()
export class CharacterService {
  constructor(
    private readonly characterRepository: CharacterRepository, // Replace with actual repository type
  ) {}

  async getCharacterList(
    userId: string,
    requestDto: GetPaginatedCharactersRequestDto,
  ): Promise<[CharacterListItemResponseDto[], number]> {
    const [characters, totalCount] = await this.characterRepository.getPaginatedCharacters(userId, requestDto);
    return [
      characters.map((character) => {
        const characterDto = plainToInstance(CharacterListItemResponseDto, character, {
          excludeExtraneousValues: true,
        });
        characterDto.userProgress = character.userCharacters?.[0]?.progress || 0;
        characterDto.status = character.userCharacters?.[0]?.status || USER_CHARACTER_STATUS.LOCKED;
        return characterDto;
      }),
      totalCount,
    ];
  }
}
