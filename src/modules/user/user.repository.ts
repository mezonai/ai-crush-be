import { BaseRepository } from '@/common/core/base.repository';
import { User } from '@/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';

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

  async createUser(userData: User): Promise<User> {
    const user = this.postRepository().create(userData);
    return await this.postRepository().save(user);
  }
}
