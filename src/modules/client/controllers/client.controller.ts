import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { ClientCreateDto } from '../../../common/storage/dtos/client-create.dto';
import { ClientEntity } from '../../../common/storage/postgres/entities/client.entity';
import { ClientGetDto } from '../../../common/storage/dtos/client-get.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('api/client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Create client',
    description: 'This endpoint is used to store a client.',
  })
  @ApiCreatedResponse({
    description: 'Client created succesfully',
    type: ClientEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'fullName',
            message: [
              'The `fullName` argument must be of type string',
              'fullName should not be empty',
            ],
          },
          {
            field: 'email',
            message: [
              'The `email` argument must be of type string',
              'email should not be empty',
            ],
          },
          {
            field: 'phone',
            message: [
              'The `phone` argument must be of type string',
              'phone should not be empty',
            ],
          },
          {
            field: 'photo',
            message: [
              'The `photo` argument must be of type string',
              'photo should not be empty',
            ],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
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
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @ApiForbiddenResponse({
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      },
    },
  })
  @ApiOkResponse({
    description: 'Client fetched succesfully',
    type: ClientGetDto,
  })
  @ApiNotFoundResponse({
    description: 'Client by search not found',
    content: {
      'application/json': {
        examples: {
          SearchByEmail: {
            value: {
              statusCode: 404,
              message:
                'Client with email sebastian.barrera@gmail.com does not exist',
            },
          },
          SearchByPhone: {
            value: {
              statusCode: 404,
              message: 'Client with phone 123456668 does not exist',
            },
          },
        },
      },
    },
  })
  @ApiParam({
    name: 'search',
    description:
      'This decorator specifies the search criteria for fetch a specific client. Email or phone number can be provided as a search parameter.',
    allowEmptyValue: false,
  })
  @ApiOperation({
    summary: 'Get client by search',
    description:
      'This endpoint is used to fetch the client by email or phone number.',
  })
  getClientBySearch(@Param('search') search: string): Promise<ClientGetDto> {
    return this.clientService.getClientBySearch(search);
  }
}
