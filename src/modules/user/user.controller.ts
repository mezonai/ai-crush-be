import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto, UserDetailDto, UserFavoritesResponseDto } from './types/response.dto';
import { UUIDParam } from '@/common/decorators/transform.decorator';
import { ResultResponse } from '@/common/interfaces/base';
import { CreateUserRequestDto } from './types/request.dto';
import { USER_FAVORITES } from '@/common/core/users';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getHello(): string {
    return this.userService.getUser();
  }

  @Get('/favorites')
  getUserFavorites(): ResultResponse<UserFavoritesResponseDto> {
    return {
      data: {
        favorites: USER_FAVORITES,
      } as UserFavoritesResponseDto,
    };
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
