import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginMezonHashRequestDto {
  @ApiProperty({
    description: 'Web app data takes from mezon app',
    example: 'query_id=UO25KGASFAEFARUE&user=%7B%22...',
  })
  @IsNotEmpty()
  @IsString()
  web_app_data: string;
}

export class RefreshTokenRequestDto {
  @ApiProperty({
    description: 'Refresh token obtained from the server, used to request a new access token.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
