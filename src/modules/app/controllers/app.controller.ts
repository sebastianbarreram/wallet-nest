import { Controller, Param, Put } from '@nestjs/common';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';
import { AppService } from '../services/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put(':id')
  updateApp(@Param('id') id: string, app: AppUpdateDto) {
    return this.appService.updateApp(id, app);
  }
}
