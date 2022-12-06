import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';
import { MovementEntity } from '../../../common/storage/postgres/entities/movement.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
  ) {}

  createMovement(movementInput: MovementCreateDto): Promise<MovementEntity> {
    const movement = new MovementEntity(movementInput);
    return this.movementRepository.save(movement);
  }
}
