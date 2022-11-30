import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';
import { ClientEntity } from 'src/common/storage/postgres/entities/client.entity';

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(
    @Body()
    client: // new ValidationPipe({
    //   transform: true,
    //   whitelist: true,
    //   forbidNonWhitelisted: true,
    // }),
    ClientCreateDto,
  ): Promise<ClientEntity> {
    const newClient = new ClientEntity(client);
    return this.clientService.createNewClient(newClient);
  }
  // signup() {}

  @Get()
  getClient() {
    return this.clientService.getClient();
  }

  @Get('search/:search')
  getClientBySearch(@Param('search') search: string) {}
}
