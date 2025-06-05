import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) { }

  @Get('')
  getHello(): string {
    return this.appService.getUser();
  }
}
