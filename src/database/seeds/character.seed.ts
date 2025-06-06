// import { User } from '@/database/entities/user.entity';
import { DataSource } from 'typeorm';

export async function seedCharacterData(dataSource: DataSource): Promise<void> {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    // const userData = {} as Partial<User>;
    // await queryRunner.manager.getRepository(User).insert(userData);

    await queryRunner.commitTransaction();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await queryRunner.rollbackTransaction();
  }
}
