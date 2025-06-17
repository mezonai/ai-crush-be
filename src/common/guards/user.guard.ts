import { AuthGuard as NestAuthGuard, type IAuthGuard, type Type } from '@nestjs/passport';

export function UserAuthGuard(): Type<IAuthGuard> {
  return NestAuthGuard(['jwt']);
}
