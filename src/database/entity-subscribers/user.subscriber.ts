import { config } from 'dotenv';
import { RequestContext } from 'nestjs-request-context';
import { type EntitySubscriberInterface, EventSubscriber, type UpdateEvent } from 'typeorm';

import { User } from '../entities/user.entity';
config();

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor() {}

  listenTo(): typeof User {
    return User;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeUpdate(event: UpdateEvent<User>): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = RequestContext?.currentContext?.req?.user as { id: unknown };
    console.log('UserSubscriber beforeUpdate', user?.id);
  }
}
