import { ApiProperty } from '@nestjs/swagger';

type AppError = {
  message: string;
  code?: string;
};

export class ResultResponse<T = null> {
  @ApiProperty()
  data?: T;

  @ApiProperty()
  error?: AppError;
}
