import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { CharacterReward } from './character-reward.entity';

@Entity('user_character_rewards')
export class UserCharacterReward extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'character_reward_id' })
  characterRewardId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userCharacterRewards)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => CharacterReward, (characterReward) => characterReward.userCharacterRewards)
  @JoinColumn({ name: 'character_reward_id' })
  public characterReward: CharacterReward;
}
