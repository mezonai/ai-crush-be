import { Gender } from '@/common/types/common';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString()
  webAppData: string;

  @IsString()
  @ApiProperty()
  identityId: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  avatarUrl: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty()
  userName: string;

  @IsInt()
  @ApiProperty()
  age: number;

  @IsString()
  @ApiProperty()
  gender: Gender;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  favorites: string;
}
