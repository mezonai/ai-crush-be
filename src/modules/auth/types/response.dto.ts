import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class JwtPayload {
  @IsEmail()
  email: string;

  @IsString()
  identityId: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}

export class LoginMezonHashResponseDto {
  @ApiProperty()
  @Expose()
  @IsString()
  accessToken: string;

  @ApiProperty()
  @Expose()
  @IsString()
  refreshToken: string;
}