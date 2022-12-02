import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MovementService } from '../services/movement.service';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';

@Controller('api/movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
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
