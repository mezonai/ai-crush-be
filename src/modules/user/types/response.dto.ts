import { Gender, UserFavorites } from '@/common/types/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDetailDto {
  @ApiProperty({ description: 'User ID (UUID)' })
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty({ description: 'Username' })
  @Expose()
  userName: string;

  @ApiProperty({ description: 'Age' })
  @Expose()
  age: number;

  @ApiProperty({ description: 'Avatar URL' })
  @Expose()
  avatarUrl: string;

  @ApiProperty({ description: 'Gender' })
  @Expose()
  gender: Gender;

  @ApiProperty({ description: 'Language (e.g., vi)' })
  @Expose()
  language: string;

  @ApiProperty({ description: 'Favorites (JSON object)' })
  @Expose()
  favorites: string;

  @ApiProperty({ description: 'Token balance (from Mezon)' })
  @Expose()
  tokenBalance: string;

  @ApiProperty({ description: 'Number of game turns' })
  @Expose()
  gameTurns: number;

  @ApiProperty({ description: 'Last time a game turn was used' })
  @Expose()
  gameTurnLastUsed: Date;
}

export class UserDetailIncludeRefreshTokenDto extends UserDetailDto {
  @ApiProperty()
  @Expose()
  refreshToken: string;
}
export class MezonUserDetailDto extends UserDetailDto {
  @ApiProperty({ description: 'Identity ID from Mezon (UUID)' })
  @Expose()
  identityId: string;
}

export class UserExistResponseDto {
  @ApiProperty({ example: false })
  @Expose()
  isExist: boolean;
}

export class CreateUserResponseDto {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;
}

export class UserFavoritesResponseDto {
  @ApiProperty()
  @Expose()
  favorites: UserFavorites[];
}
