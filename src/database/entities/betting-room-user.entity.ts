import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { BettingRoom } from './betting-room.entity';

@Entity('betting_room_users')
export class BettingRoomUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'uuid', name: 'betting_room_id' })
  bettingRoomId: string;

  @Column({ type: 'int', default: 0, name: 'points' })
  points: number;

  @ManyToOne(() => User, (user) => user.bettingRoomUsers)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => BettingRoom, (bettingRoom) => bettingRoom.bettingRoomUsers)
  @JoinColumn({ name: 'betting_room_id' })
  public bettingRoom: BettingRoom;
}
