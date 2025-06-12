import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultResponse } from '@/common/interfaces/base';
import { LoginMezonHashRequestDto } from './types/request.dto';
import { JWTResponseDto } from './types/response.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailIncludeRefreshTokenDto } from '../user/types/response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login-mezon')
  @HttpCode(200)
  @ApiOperation({ summary: 'Verify Mezon hash and login user' })
  @ApiBody({ type: LoginMezonHashRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Login Mezon hash verified successfully',
    type: JWTResponseDto,
  })
  async loginMezon(@Body() body: LoginMezonHashRequestDto): Promise<ResultResponse<JWTResponseDto>> {
    const response = await this.authService.loginMezon(body);
    return {
      data: response,
    } as ResultResponse<JWTResponseDto>;
  }


  @Auth()
  @Post('/check')
  @HttpCode(200)
  @ApiOperation({ summary: 'Check authentication (requires accessToken)' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated',
  })
  async healthCheck(): Promise<ResultResponse<string>> {
    return {
      data: 'Auth service is healthy',
    } as ResultResponse<string>;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh-token')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh access token using a valid refresh token in the Authorization header' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Refresh tokens successfully',
    type: JWTResponseDto,
  })
  async refreshToken(@Request() req): Promise<ResultResponse<JWTResponseDto>> {
    const user: UserDetailIncludeRefreshTokenDto = req.user;
    const response = await this.authService.refreshToken(user);
    return {
      data: response
    } as ResultResponse<JWTResponseDto>;
  }
}
