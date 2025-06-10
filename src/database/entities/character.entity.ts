import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { CharacterMajor, CharacterLevel, Gender } from '@/common/types/common';
import { UserCharacter } from './user-character.entity';
import { CharacterEmotion } from './character-emotion.entity';
import { UserQuestionHistory } from './user-question-history.entity';
import { BettingRoomCharacter } from './betiing-room-character.entity';
import { CharacterReward } from './character-reward.entity';

@Entity('characters')
export class Character extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'character_name' })
  characterName: string;

  @Column({ type: 'varchar', name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ type: 'varchar', name: 'preview_video_url', nullable: true })
  previewVideoUrl: string;

  @Column({ type: 'varchar', length: 20, name: 'level', nullable: true })
  level: CharacterLevel;

  @Column({ type: 'varchar', length: 255, name: 'major', nullable: true })
  major: CharacterMajor;

  @Column({ type: 'varchar', length: 50, name: 'gender', nullable: true })
  gender: Gender;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'unlock_token_amount' })
  unlockTokenAmount: string;

  @OneToMany(() => CharacterReward, (characterReward) => characterReward.character)
  characterRewards: CharacterReward[];

  @OneToMany(() => UserCharacter, (userToCharacter) => userToCharacter.character)
  userCharacters: UserCharacter[];

  @OneToMany(() => CharacterEmotion, (characterEmotion) => characterEmotion.character)
  characterEmotions: CharacterEmotion[];

  @OneToMany(() => UserQuestionHistory, (userQuestionHistory) => userQuestionHistory.character)
  userQuestionHistories: UserQuestionHistory[];

  @OneToMany(() => BettingRoomCharacter, (bettingRoomCharacter) => bettingRoomCharacter.character)
  bettingRoomCharacters: BettingRoomCharacter[];
}
