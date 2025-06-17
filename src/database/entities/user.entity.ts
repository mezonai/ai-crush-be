import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { Gender } from '@/common/types/common';
import { UserCharacter } from './user-character.entity';
import { UserQuestionHistory } from './user-question-history.entity';
import { UserExtraReward } from './user-extra-reward.entity';
import { BettingRoom } from './betting-room.entity';
import { UserTransaction } from './user-transaction.entity';
import { BettingRoomUser } from './betting-room-user.entity';
import { UserCharacterReward } from './user-character-reward.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 255, name: 'identity_id', unique: true })
  identityId: string;

  @Column({ type: 'varchar', length: 255, name: 'user_name' })
  userName: string;

  @Column({ type: 'varchar', nullable: true, length: 20 })
  language: string;

  @Column({ type: 'varchar', default: '0', length: 255, name: 'token_balance' })
  tokenBalance: string;

  @Column({ type: 'int', default: 0, name: 'game_turns' })
  gameTurns: number;

  @Column({ type: 'timestamp', nullable: true, name: 'game_turn_last_used' })
  gameTurnLastUsed: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'smallint', nullable: true })
  age: string;

  @Column({ type: 'varchar', length: 50, name: 'gender', nullable: true })
  gender: Gender;

  @Column({ type: 'jsonb', name: 'favorites', nullable: true })
  favorites: string;

  @Column({ type: 'varchar', name: 'refresh_token', nullable: true }) refreshToken: string;

  @OneToMany(() => BettingRoom, (bettingRoom) => bettingRoom.owner)
  userOwnerBettingRooms: BettingRoom[];

  @OneToMany(() => BettingRoom, (bettingRoom) => bettingRoom.winner)
  userWinnerBettingRooms: BettingRoom[];

  @OneToMany(() => UserCharacter, (userToCharacter) => userToCharacter.user)
  userCharacters: UserCharacter[];

  @OneToMany(() => UserQuestionHistory, (userQuestionHistory) => userQuestionHistory.user)
  userQuestionHistories: UserQuestionHistory[];

  @OneToMany(() => UserExtraReward, (userExtraReward) => userExtraReward.user)
  userExtraRewards: UserExtraReward[];

  @OneToMany(() => UserTransaction, (userTransaction) => userTransaction.user)
  userTransactions: UserTransaction[];

  @OneToMany(() => BettingRoomUser, (bettingRoomUser) => bettingRoomUser.user)
  bettingRoomUsers: BettingRoomUser[];

  @OneToMany(() => UserCharacterReward, (userCharacterReward) => userCharacterReward.user)
  userCharacterRewards: UserCharacterReward[];
}
