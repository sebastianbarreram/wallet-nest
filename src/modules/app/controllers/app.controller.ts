import { Controller, Put } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put()
  updateApp() {}
}
