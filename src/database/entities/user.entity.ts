import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'identity_id' })
  identityId: string;

  @Column({ type: 'varchar', name: 'user_name', nullable: true })
  userName: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'smallint', nullable: true })
  age: string;
}
