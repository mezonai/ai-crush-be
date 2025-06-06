import { ApiProperty } from '@nestjs/swagger';

export class ResultResponse<T> {
  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: T;
}
