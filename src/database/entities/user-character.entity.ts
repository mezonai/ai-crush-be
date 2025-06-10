import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { User } from './user.entity';
import { Character } from './character.entity';
import { UserCharacterStatus } from '@/common/types/common';

@Entity('user_characters')
export class UserCharacter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'character_id' })
  characterId: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ type: 'smallint', default: 0, name: 'progress' })
  progress: number;

  @Column({ type: 'smallint', name: 'status' })
  status: UserCharacterStatus;

  @ManyToOne(() => User, (user) => user.userCharacters)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(() => Character, (character) => character.userCharacters)
  @JoinColumn({ name: 'character_id' })
  public character: Character;
}
