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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
