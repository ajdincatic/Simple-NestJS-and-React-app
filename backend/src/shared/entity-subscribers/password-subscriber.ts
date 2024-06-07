import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { UtilsService } from '../helpers/utils.service';
import { User } from '../../api/user/entities/user.entity';

@EventSubscriber()
export class PasswordSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    if (event.entity.password) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }

  beforeUpdate(event: UpdateEvent<User>) {
    if (
      event?.entity?.password &&
      event.entity.password !== event.databaseEntity.password
    ) {
      event.entity.password = UtilsService.generateHash(event.entity.password);
    }
  }
}
