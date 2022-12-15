import { DocumentBuilder } from '@nestjs/swagger';

export const configDocumentBuilder = new DocumentBuilder()
  .setTitle('Wallet Nest')
  .setDescription('The Wallet Nest API description')
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
