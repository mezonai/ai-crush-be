import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserDetailDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  userName: string;

  @ApiProperty()
  @Expose()
  age: number;
}

export class MezonUserDetailDto extends UserDetailDto {
  @ApiProperty()
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
