import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  createNewClient(): void {}

  getClient() {}

  getClientBySearch(search: string) {}
}
