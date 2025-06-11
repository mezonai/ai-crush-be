import { User } from '@/database/entities/user.entity';
import { DataSource } from 'typeorm';

export async function seedUserData(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    const userData: Partial<User>[] = [
      {
        avatarUrl: '"https://cdn.mezon.ai/0/1929366333426765824/1929366333426765800/1748832242252_undefinedavatar.jpg_croppedWEBP"',
        identityId: '1929366333426765824',
        userName: 'trinh.lenhat',
        language: 'vi',
        tokenBalance: '1000',
        gameTurns: "10",
        email: 'trinh@email.com',
        age: "25",
        gender: 'male',
        favorites: ['poker', 'chess'],
      }
    ]
    await queryRunner.manager.getRepository(User).insert(userData);

    await queryRunner.commitTransaction();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await queryRunner.rollbackTransaction();
  }
}
