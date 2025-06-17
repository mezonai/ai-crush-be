import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  CreateUserResponseDto,
  MezonUserDetailDto,
  UserDetailDto,
  UserExistResponseDto,
  UserDetailIncludeRefreshTokenDto,
} from './types/response.dto';
import { CreateUserRequestDto } from './types/request.dto';
import { User } from '@/database/entities/user.entity';
import { verifyMezonHash } from '@/utils/hash';
import { MezonEnv } from '@/types/env';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getUserById(userId: string): Promise<UserDetailDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }
    return plainToInstance(UserDetailDto, user, { excludeExtraneousValues: true });
  }

  async getUserWithRefreshTokenById(userId: string): Promise<UserDetailIncludeRefreshTokenDto> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found.`);
    }
    return plainToInstance(UserDetailIncludeRefreshTokenDto, user, { excludeExtraneousValues: true });
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

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new BadRequestException(`User with Id ${userId} not exists.`);
    }
    return await this.userRepository.saveRefreshToken(userId, refreshToken);
  }

  async createUser(request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const mezonConfig = this.configService.get<MezonEnv>('mezon');
    const { appToken, expiresTimeOffset } = mezonConfig as MezonEnv;
    const { userMezon } = verifyMezonHash(request.webAppData, appToken, Number(expiresTimeOffset));
    const { id: identityId } = userMezon;
    const user = await this.userRepository.findUserByIdentity(identityId);
    if (user) {
      throw new BadRequestException(`User with identity ID ${identityId} already exists.`);
    }

    const userData = plainToInstance(User, instanceToPlain(request));
    const newUser = await this.userRepository.createUser(userData);
    const { accessToken, refreshToken } = this.authService.generateToken(newUser.id, newUser.email);
    await this.saveRefreshToken(newUser.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    } as CreateUserResponseDto;
  }

  // This cron run every minute
  @Cron('0 * * * * *')
  handleIncrementUserGameTurns() {
    this.logger.log('code here');
  }
}
