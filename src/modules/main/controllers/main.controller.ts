import { Controller, Get } from '@nestjs/common';
import { MainService } from '../services/main.service';

@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  // @Get()
  getHello(): string {
    return this.mainService.getHello();
  }
}
