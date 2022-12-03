import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';
import { MovementEntity } from '../../../common/storage/postgres/entities/movement.entity';
import { AccountService } from '../../account/services/account.service';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';

@Injectable()
export class MovementService {
  constructor(
    private dataSource: DataSource,
    private readonly accountService: AccountService,
  ) {}

  createMovement(movementInput: MovementCreateDto): Promise<MovementEntity>{
    const movement = new MovementEntity(movementInput);
    console.log(movement);

    return this.dataSource.getRepository(MovementEntity).save(movement);

    // this.dataSource
    //   .getRepository(MovementEntity)
    //   .save(movement)
    //   .then((data) => {
    //     console.log('data', data);
    //   })
    //   .catch((err) => console.log(err));

  }
}
