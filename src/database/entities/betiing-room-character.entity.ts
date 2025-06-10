import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { BettingRoom } from './betting-room.entity';
import { Character } from './character.entity';

@Entity('betting_room_characters')
export class BettingRoomCharacter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'character_id' })
  characterId: string;

  @Column({ type: 'uuid', name: 'betting_room_id' })
  bettingRoomId: string;

  @ManyToOne(() => Character, (character) => character.bettingRoomCharacters)
  @JoinColumn({ name: 'character_id' })
  public character: Character;

  @ManyToOne(() => BettingRoom, (bettingRoom) => bettingRoom.bettingRoomCharacters)
  @JoinColumn({ name: 'betting_room_id' })
  public bettingRoom: BettingRoom;
}
