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

  async findUserByMezonId(userMezonId: string): Promise<User | null> {
    return this.postRepository().findOne({
      where: { identityId: userMezonId },
    });
  }
}
