import { ApiProperty } from '@nestjs/swagger';

type AppError = {
  message: string;
  code?: string;
};

export type PaginationMeta = {
  totalCount: number;
  currentPage: number;
  limit: number;
};

export class ResultResponse<T = null, V = null> {
  meta?: V;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: AppError;
}
