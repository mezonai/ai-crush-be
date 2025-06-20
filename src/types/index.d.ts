import { UserDetailDto } from '@/modules/user/types/response.dto';

declare module 'express' {
  export interface Request {
    user?: UserDetailDto;
  }
}
