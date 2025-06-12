import { CHARACTER_MAJOR } from '../core/characters';

type AppError = {
  message: string;
  code?: string;
};

export type ResponseData<T = null, U = object> = {
  meta: U;
  data?: T;
  error?: AppError;
};

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const GAME_MODE = {
  SOLO: 'male',
  BETING: 'beting',
} as const;

export type GameMode = (typeof GAME_MODE)[keyof typeof GAME_MODE];

export const USER_CHARACTER_STATUS = {
  LOCKED: 'locked',
  INPROGRESS: 'inprogress',
  COMPLETED: 'completed',
} as const;

export type UserCharacterStatus = (typeof USER_CHARACTER_STATUS)[keyof typeof USER_CHARACTER_STATUS];

export const CHARACTER_LEVEL = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;
export type CharacterLevel = (typeof CHARACTER_LEVEL)[keyof typeof CHARACTER_LEVEL];

export const CHARACTER_REWARD = {
  IMAGE: 'image',
  VIDEO: 'video',
  TOKEN: 'token',
} as const;
export type CharacterRewardType = (typeof CHARACTER_REWARD)[keyof typeof CHARACTER_REWARD];

export const CHARACTER_MAJOR_NAME = {
  IT: CHARACTER_MAJOR.IT.name,
  ART: CHARACTER_MAJOR.ART.name,
  MUSIC: CHARACTER_MAJOR.MUSIC.name,
  SCIENCE: CHARACTER_MAJOR.SCIENCE.name,
} as const;
export type CharacterMajor = (typeof CHARACTER_MAJOR_NAME)[keyof typeof CHARACTER_MAJOR_NAME];

export const CHARACTER_EMOTION = {
  HAPPY: 1,
  SAD: 2,
  NORMAL: 3,
} as const;
export type CharacterEmotionType = (typeof CHARACTER_EMOTION)[keyof typeof CHARACTER_EMOTION];

export type QuestionAnswer = {
  text: string;
  affectionChange: number;
  emotion: CharacterEmotionType;
};

export type Question = {
  question: string;
  answers: QuestionAnswer[];
};

export const BETTING_ROOM_STATUS = {
  CREATED: 'created',
  STARTED: 'started',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;
export type BettingRoomStatus = (typeof BETTING_ROOM_STATUS)[keyof typeof BETTING_ROOM_STATUS];

export const EXTRA_REWARDS = {
  NEW_USER: 1,
  FIRST_CHARACTER_COMPLETED: 2,
  WIN_FIRST_BETTING: 3,
} as const;
export type ExtraRewardType = (typeof EXTRA_REWARDS)[keyof typeof EXTRA_REWARDS];

export const TRANSACTION_TYPES = {
  DEPOSIT: 'deposit',
  WITHDRAWAL: 'withdrawal',
  BUY_GAME_TURNS: 'buy_game_turns',
  UNLOCK_CHARACTER: 'unlock_character',
  WIN_BETTING: 'win_betting',
  JOIN_BETTING: 'join_betting',
  EXTRA_REWARD: 'extra_reward',
} as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const TRANSACTION_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;
export type TransactionStatus = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export type UserFavorites = {
  id: number;
  value: string;
};
