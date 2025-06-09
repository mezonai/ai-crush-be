import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    name: 'id',
    description: 'Unique identifier for the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  id: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MaxLength(255)
  @ApiProperty()
  userName: string;

  @IsInt()
  @ApiProperty()
  age: number;
}
