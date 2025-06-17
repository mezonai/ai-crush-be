import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CharacterService } from './character.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationMeta, ResultResponse } from '@/common/interfaces/base';
import { GetPaginatedCharactersRequestDto } from './types/request.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { CharacterListItemResponseDto } from './types/response.dto';

@ApiTags('Character')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get paginated characters' })
  @ApiResponse({
    status: 200,
    description: 'Returns a paginated list of characters',
  })
  async getPaginatedCharacters(
    @Req() req: { user: { id: string } },
    @Query() requestDto: GetPaginatedCharactersRequestDto,
  ): Promise<ResultResponse<CharacterListItemResponseDto[], PaginationMeta>> {
    const [characters, totalCount] = await this.characterService.getCharacterList(req.user.id, requestDto);
    return {
      meta: {
        totalCount: totalCount,
        page: requestDto.page,
        limit: requestDto.limit,
      },
      data: characters,
    } as unknown as ResultResponse<CharacterListItemResponseDto[], PaginationMeta>;
  }
}
