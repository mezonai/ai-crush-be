import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { ExtraRewardType } from '@/common/types/common';

@Entity('user_extra_rewards')
export class UserExtraReward extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'smallint', name: 'reward_type' })
  rewardType: ExtraRewardType;

  @Column({ type: 'varchar', length: 255, name: 'reward_amount' })
  rewardAmount: string;

  @ManyToOne(() => User, (user) => user.userExtraRewards)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
