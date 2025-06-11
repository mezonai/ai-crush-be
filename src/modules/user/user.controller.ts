import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto, UserDetailDto } from './types/response.dto';
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
      data: await this.userService.getUserById(userId),
    };
  }

  @Post('/')
  async createUser(@Body() request: CreateUserRequestDto): Promise<ResultResponse<CreateUserResponseDto>> {
    const response = await this.userService.createUser(request);
    return {
      data: response,
    } as ResultResponse<CreateUserResponseDto>;
  }
}
