import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './user-base.entity';
import { CharacterEmotionType } from '@/common/types/common';
import { Character } from './character.entity';

@Entity('character_emotions')
export class CharacterEmotion extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'character_id' })
  characterId: string;

  @Column({ type: 'smallint', name: 'emotion_type' })
  emotionType: CharacterEmotionType;

  @Column({ type: 'varchar', name: 'video_url' })
  videoUrl: string;

  @ManyToOne(() => Character, (character) => character.characterEmotions)
  @JoinColumn({ name: 'character_id' })
  character: Character;
}
