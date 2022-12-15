import { DocumentBuilder } from '@nestjs/swagger';

export const configDocumentBuilder = new DocumentBuilder()
  .setTitle('Wallet Nest')
  .setDescription(
    'The API is built to allow you to create a functional wallet application. You can create, fetch and update client, account or app information if it is requered, and create transactions (movements) with specific amount of money. The API uses standard verbs and returns HTTP response codes and JSON-encoded responses.',
  )
  .setVersion('1.0')
  .addTag(
    'App',
    'Description of the APIs corresponding to the application management',
  )
  .addTag(
    'Account',
    'Description of the APIs corresponding to the account management',
  )
  .addTag(
    'Client',
    'Description of the APIs corresponding to the client management',
  )
  .addTag(
    'Movement',
    'Description of the APIs corresponding to the transactions management',
  )
  .addBearerAuth(
    { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
