import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { Question, QuestionAnswer } from '@/common/types/common';
import { Character } from './character.entity';
import { BettingRoom } from './betting-room.entity';

@Entity('user_question_histories')
export class UserQuestionHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'character_id' })
  characterId: string;

  @Column({ type: 'jsonb', name: 'question' })
  question: Question;

  @Column({ type: 'jsonb', nullable: true, name: 'answer' })
  answer: QuestionAnswer;

  @Column({ type: 'uuid', nullable: true, name: 'betting_room_id' })
  bettingRoomId: string;

  @Column({ type: 'smallint', name: 'affection_change' })
  affectionChange: number;

  @ManyToOne(() => User, (user) => user.userQuestionHistories)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Character, (character) => character.userQuestionHistories)
  @JoinColumn({ name: 'character_id' })
  public character: Character;

  @ManyToOne(() => BettingRoom, (bettingRoom) => bettingRoom.userQuestionHistories)
  @JoinColumn({ name: 'betting_room_id' })
  public bettingRoom: BettingRoom;
}
