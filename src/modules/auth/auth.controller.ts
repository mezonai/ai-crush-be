import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultResponse } from '@/common/interfaces/base';
import { LoginMezonHashRequestDto } from './types/request.dto';
import { LoginMezonHashResponseDto } from './types/response.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login-mezon')
  @ApiOperation({ summary: 'Verify Mezon hash and login user' })
  @ApiBody({ type: LoginMezonHashRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Login Mezon hash verified successfully',
    type: LoginMezonHashResponseDto,
  })
  async verifyMezonHash(@Body() body: LoginMezonHashRequestDto): Promise<ResultResponse<LoginMezonHashResponseDto>> {
    const response = await this.authService.verifyMezonHash(body);
    return {
      data: response,
    } as ResultResponse<LoginMezonHashResponseDto>;
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/check')
  @ApiBearerAuth()
  async healthCheck(): Promise<ResultResponse<string>> {
    return {
      data: 'Auth service is healthy',
    } as ResultResponse<string>;
  }
}
