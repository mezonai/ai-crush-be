import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { plainToInstance } from 'class-transformer';
import { UserDetailDto, UserExistResponse } from './types/response.dto';

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

  async checkUserExistByMezonId(userId: string): Promise<UserExistResponse> {
    const user = await this.userRepository.findUserById(userId);
    return { isExist: !!user };
  }
}
