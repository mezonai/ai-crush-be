import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { TransactionStatus, TransactionType } from '@/common/types/common';

@Entity('user_transactions')
export class UserTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'smallint', name: 'transaction_type' })
  transactionType: TransactionType;

  @Column({ type: 'varchar', length: 255, name: 'token_amount' })
  tokenAmount: string;

  @Column({ type: 'varchar', length: 50 })
  status: TransactionStatus;

  @ManyToOne(() => User, (user) => user.userTransactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
