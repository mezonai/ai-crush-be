import { BaseRepository } from '@/common/core/base.repository';
import { User } from '@/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, LessThan, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository {
  private postRepository(entityManager?: EntityManager): Repository<User> {
    return this.getRepository(User, entityManager);
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.postRepository().findOne({
      where: { id: userId },
    });
  }

  async findUserByIdentity(identityId: string): Promise<User | null> {
    return this.postRepository().findOne({
      where: { identityId },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.postRepository().findOne({
      where: { email },
    });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.postRepository().create(userData);
    return await this.postRepository().save(user);
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.postRepository().update({ id: userId }, { refreshToken });
  }

  async findUsersWithLessThanMaxTurns(maxTurns: number): Promise<User[]> {
    return this.postRepository().find({
      where: {
        gameTurns: LessThan(maxTurns),
      },
    });
  }

  async updateGameTurnsById(
    userId: string,
    gameTurns: number,
    gameTurnLastUsed: Date | null,
    entityManager?: EntityManager,
  ): Promise<void> {
    await this.postRepository(entityManager).update(userId, {
      gameTurns,
      gameTurnLastUsed,
    });
  }
}
