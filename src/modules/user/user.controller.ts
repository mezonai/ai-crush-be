import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDetailDto, UserExistResponse } from './types/response.dto';
import { UUIDParam } from '@/common/decorators/transform.decorator';
import { ResultResponse } from '@/common/interfaces/base';
import { CreateUserRequestDto } from './types/request.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('')
  getHello(): string {
    return this.userService.getUser();
  }

  @Get('/:userId')
  async getUserById(@UUIDParam('userId') userId: string): Promise<ResultResponse<UserDetailDto>> {
    return {
      message: 'User retrieved successfully',
      data: await this.userService.getUserById(userId),
    };
  }

  @Get('/exist/:userMezonId')
  @ApiOperation({ summary: 'Check if user exists by Mezon ID' })
  @ApiParam({
    name: 'userMezonId',
    type: String,
    description: 'Mezon user ID to check existence',
    example: '1929366333426765824',
  })
  @ApiResponse({
    status: 200,
    description: 'User existence checked successfully',
    type: UserExistResponse,
  })
  async checkUserExistByMezonId(userMezonId: string): Promise<ResultResponse<UserExistResponse>> {
    return {
      message: 'User existence checked successfully',
      data: await this.userService.checkUserExistByMezonId(userMezonId),
    };
  }

  @Post('/')
  createUser(@Body() request: CreateUserRequestDto): any {
    return {};
  }
}
