import { IsPositiveNumber } from "@/common/decorators/validation.decorator";
import { CHARACTER_LEVEL, CharacterLevel } from "@/common/types/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class GetPaginatedCharactersRequestDto {
  @IsPositiveNumber()
  @ApiProperty({
    description: 'The page number for pagination, starting from 1',
    example: 1,
    default: 1,
  })
  page: number;

  @IsNumber()
  @ApiProperty({
    description: 'Pass -1 to get all characters, or specify a limit for pagination',
    example: 1,
    default: 1,
  })
  limit: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Search query to filter characters by name or other attributes',
    example: 'John',
    required: false,
  })
  search: string;

  @IsEnum(CHARACTER_LEVEL)
  @IsOptional()
  @ApiProperty({
    description: 'Filter characters by their level',
    enum: CHARACTER_LEVEL,
    required: false,
  })
  level: CharacterLevel | null;
}
