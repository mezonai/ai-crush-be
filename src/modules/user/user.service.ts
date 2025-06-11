import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateUserResponseDto, MezonUserDetailDto, UserDetailDto, UserExistResponseDto } from './types/response.dto';
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

  async getUserByEmail(email: string): Promise<UserDetailDto> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }

    if (user.deletedAt) {
      throw new NotFoundException(`User with email ${email} has been deleted.`);
    }

    return plainToInstance(UserDetailDto, user, { excludeExtraneousValues: true });
  }

  async getUserByIdentity(identityId: string): Promise<MezonUserDetailDto> {
    const user = await this.userRepository.findUserByIdentity(identityId);
    if (!user) {
      throw new NotFoundException(`User with identity ID ${identityId} not found.`);
    }

    if (user.deletedAt) {
      throw new NotFoundException(`User with identity ID ${identityId} has been deleted.`);
    }

    return plainToInstance(MezonUserDetailDto, user, { excludeExtraneousValues: true });
  }

  async checkUserExistByMezonId(identityId: string): Promise<UserExistResponseDto> {
    const user = await this.userRepository.findUserByIdentity(identityId);
    if (user?.deletedAt) {
      throw new NotFoundException(`User has been deleted.`);
    }

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
