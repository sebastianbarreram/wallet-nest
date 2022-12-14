import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';
import { ClientEntity } from '../../../common/storage/postgres/entities/client.entity';
import { ClientGetDto } from '../../../common/storage/dtos/client-get.dto';

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  signup(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newClient: ClientCreateDto,
  ): Promise<ClientEntity> {
    return this.clientService.createNewClient(newClient);
  }

  @Get('search/:search')
  getClientBySearch(@Param('search') search: string): Promise<ClientGetDto> {
    return this.clientService.getClientBySearch(search);
  }
}
