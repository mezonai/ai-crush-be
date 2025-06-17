import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateUserResponseDto,
  UserDetailDto,
  UserExistResponseDto,
  UserFavoritesResponseDto,
} from './types/response.dto';
import { UUIDParam } from '@/common/decorators/transform.decorator';
import { ResultResponse } from '@/common/interfaces/base';
import { CreateUserRequestDto } from './types/request.dto';
import { USER_FAVORITES } from '@/common/core/users';
import { Auth } from '@/common/decorators/auth.decorator';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/favorites')
  @ApiOperation({ summary: 'Get the user favorites' })
  @ApiResponse({
    status: 200,
    type: ResultResponse<UserFavoritesResponseDto>,
  })
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
    type: UserExistResponseDto,
  })
  async checkUserExistByMezonId(
    @Param('userMezonId') userMezonId: string,
  ): Promise<ResultResponse<UserExistResponseDto>> {
    const response = await this.userService.checkUserExistByMezonId(userMezonId);
    return {
      data: response,
    } as ResultResponse<UserExistResponseDto>;
  }

  @Post('/')
  async createUser(@Body() request: CreateUserRequestDto): Promise<ResultResponse<CreateUserResponseDto>> {
    const response = await this.userService.createUser(request);
    return {
      data: response,
    } as ResultResponse<CreateUserResponseDto>;
  }

  @Auth()
  @Get('')
  @ApiOperation({ summary: 'Get detail of the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'User detail retrieved successfully',
    type: UserDetailDto,
  })
  async getUserDetail(@Req() req: Request): Promise<ResultResponse<UserDetailDto>> {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException('User ID not found in request');
    const response = await this.userService.getUserById(userId);
    return {
      data: response,
    } as ResultResponse<UserDetailDto>;
  }
}
