import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateUserResponseDto, UserDetailDto, UserExistResponseDto } from './types/response.dto';
import { CreateUserRequestDto } from './types/request.dto';
import { User } from '@/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  getUser(): string {
    return 'Hello World!';
  }

  async getUserById(userId: string): Promise<UserDetailDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }
    return plainToInstance(UserDetailDto, user, { excludeExtraneousValues: true });
  }

  async checkUserExistByMezonId(userId: string): Promise<UserExistResponseDto> {
    const user = await this.userRepository.findUserByIdentity(userId);
    return { isExist: !!user } as UserExistResponseDto;
  }

  async createUser(request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    //TODO: validate request data
    const user = await this.userRepository.findUserByIdentity(request.identityId);

    if (user) {
      throw new BadRequestException(`User with identity ID ${request.identityId} already exists.`);
    }

    const userData = plainToInstance(User, instanceToPlain(request));
    const newUser = await this.userRepository.createUser(userData);
    //TODO: Implement actual token generation logic
    return {
      accessToken: 'dummyAccess',
      refreshToken: 'dummyRefresh',
    } as CreateUserResponseDto;
  }
}
