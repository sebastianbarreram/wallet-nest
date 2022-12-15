import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';
import { AppService } from '../services/app.service';
import { AuthGuard } from '../../../common/guards/auth-guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AppEntity } from '../../../common/storage/postgres/entities/app.entity';

@Controller('api/app')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put(':id')
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
    description: 'App updated succesfully',
    type: AppEntity,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    schema: {
      example: {
        statusCode: 400,
        message: [
          {
            field: 'color',
            message: [
              'The `color` argument must be of type string',
              'color should not be empty',
            ],
          },
        ],
        error: 'Bad Request',
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'This decorator specifies the id for a specific client.',
    allowEmptyValue: false,
  })
  @ApiOperation({
    summary: 'Update app',
    description: 'This endpoint is used to update the client application.',
  })
  updateApp(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateApp: AppUpdateDto,
  ): Promise<AppEntity> {
    return this.appService.updateApp(id, updateApp);
  }
}
