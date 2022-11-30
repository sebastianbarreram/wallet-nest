import { Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from '../services/client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(): void {}

  @Get()
  getClient() {}

  @Get('search/:search')
  getClientBySearch(@Param('search') search: string) {}
}
