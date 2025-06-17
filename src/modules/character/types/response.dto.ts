import { CharacterLevel, UserCharacterStatus } from "@/common/types/common";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CharacterListItemResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  avatarUrl: string;

  @ApiProperty()
  @Expose()
  level: CharacterLevel;

  @ApiProperty()
  @Expose()
  unlockTokenAmount: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  status: UserCharacterStatus;

  @ApiProperty()
  @Expose()
  userProgress: number;
}
