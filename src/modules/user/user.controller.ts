import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDetailDto } from './types/response.dto';
import { UUIDParam } from '@/common/decorators/transform.decorator';
import { ResultResponse } from '@/common/interfaces/base';
import { CreateUserRequestDto } from './types/request.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post('/')
  createUser(@Body() request: CreateUserRequestDto): any {
    return {};
  }
}
