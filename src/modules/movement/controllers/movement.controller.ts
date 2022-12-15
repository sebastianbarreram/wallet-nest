import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('api/movement')
@ApiTags('Movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Create movement',
    description: 'This endpoint is used to store a movement.',
  })
  @ApiBearerAuth('access-token')
  @ApiBody({
    type: MovementCreateDto,
  })
  @ApiCreatedResponse({
    description: 'Movement created succesfully',
    type: MovementCreateDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'idIncome',
            message: [
              'The `idIncome` argument must be of type string',
              'idIncome should not be empty',
            ],
          },
          {
            field: 'idOutcome',
            message: [
              'The `idOutcome` argument must be of type string',
              'idOutcome should not be empty',
            ],
          },
          {
            field: 'reason',
            message: [
              'The `reason` argument must be of type string',
              'reason should not be empty',
            ],
          },
          {
            field: 'amount',
            message: [
              'The `amount` argument must be of type number',
              'amount should not be empty',
            ],
          },
          {
            field: 'fees',
            message: [
              'The `fees` argument must be of type number',
              'fees should not be empty',
            ],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiForbiddenResponse({
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      },
    },
  })
  createMovement(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    newMovement: MovementCreateDto,
  ) {
    return this.movementService.createMovement(newMovement);
  }
}
