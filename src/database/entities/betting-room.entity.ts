import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { BettingRoomStatus } from '@/common/types/common';
import { UserQuestionHistory } from './user-question-history.entity';
import { BettingRoomUser } from './betting-room-user.entity';
import { User } from './user.entity';
import { BettingRoomCharacter } from './betiing-room-character.entity';

@Entity('betting_rooms')
export class BettingRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, name: 'bet_amount' })
  betAmount: string;

  @Column({ type: 'varchar', length: 50 })
  status: BettingRoomStatus;

  @Column({ type: 'uuid', nullable: true, name: 'winner_user_id' })
  winnerUserId: string;

  @Column({ type: 'uuid', name: 'owner_user_id' })
  ownerUserId: string;

  @Column({ type: 'timestamp', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date' })
  endDate: Date;

  @OneToMany(() => UserQuestionHistory, (userQuestionHistory) => userQuestionHistory.bettingRoom)
  userQuestionHistories: UserQuestionHistory[];

  @OneToMany(() => BettingRoomUser, (bettingRoomUser) => bettingRoomUser.bettingRoom)
  bettingRoomUsers: BettingRoomUser[];

  @OneToMany(() => BettingRoomCharacter, (bettingRoomCharacter) => bettingRoomCharacter.bettingRoom)
  bettingRoomCharacters: BettingRoomCharacter[];

  @ManyToOne(() => User, (owner) => owner.userOwnerBettingRooms)
  @JoinColumn({ name: 'owner_user_id' })
  owner: User;

  @ManyToOne(() => User, (owner) => owner.userWinnerBettingRooms)
  @JoinColumn({ name: 'winner_user_id' })
  winner: User;
}
