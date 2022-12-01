import { Injectable } from '@nestjs/common';
import { AppUpdateDto } from 'src/common/storage/dtos/app-update';

@Injectable()
export class AppService {
  updateApp(id: string, app: AppUpdateDto) {}
}
