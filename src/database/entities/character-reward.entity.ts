import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { UserCharacterReward } from './user-character-reward.entity';
import { Character } from './character.entity';
import { CharacterRewardType } from '@/common/types/common';

@Entity('character_rewards')
export class CharacterReward extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'character_id' })
  characterId: string;

  @Column({ type: 'smallint', name: 'required_progress' })
  requiredProgress: number;

  @Column({ type: 'varchar', length: 50, name: 'reward_type' })
  characterRewardType: CharacterRewardType;

  @Column({ type: 'varchar', default: '0', nullable: true, length: 255, name: 'reward_amount' })
  rewardAmount: string;

  @Column({ type: 'varchar', nullable: true, name: 'reward_media_url' })
  rewardMediaUrl: string;

  @ManyToOne(() => Character, (character) => character.characterRewards)
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @OneToMany(() => UserCharacterReward, (userCharacterReward) => userCharacterReward.characterReward)
  userCharacterRewards: UserCharacterReward[];
}
