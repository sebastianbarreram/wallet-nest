import { Injectable } from '@nestjs/common';
import { AppEntity } from '../../../common/storage/postgres/entities/app.entity';

@Injectable()
export class AppService {
  updateApp(id: string, app: AppEntity) {}
}
