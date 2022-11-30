import { Controller, Post } from '@nestjs/common';
import { MovementService } from '../services/movement.service';

@Controller('movement')
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Post()
  createMovement() {}
}
