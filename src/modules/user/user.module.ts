import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
