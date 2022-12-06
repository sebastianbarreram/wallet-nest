import { Body, Controller, Param, Put, ValidationPipe } from '@nestjs/common';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';
import { AppService } from '../services/app.service';

@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put(':id')
  updateApp(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateApp: AppUpdateDto,
  ) {
    return this.appService.updateApp(id, updateApp);
  }
}
