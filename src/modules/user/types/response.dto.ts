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

export class CreateUserResponseDto {
  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;
}
