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

  async createMovement(movementInput: MovementCreateDto) {
    const movement = new MovementEntity(movementInput);
    console.log(movement);

    // return this.dataSource.getRepository(MovementEntity).save(movement);

    const accountIncome = await this.accountService.getAccountByIdClient(
      movementInput.idIncome,
    );
    const accountOutcome = await this.accountService.getAccountByIdClient(
      movementInput.idOutcome,
    );
    console.log(accountIncome);
    console.log(accountOutcome);
    console.log(accountIncome.id == accountOutcome.id);

    this.dataSource.getRepository(MovementEntity).save(movement);
    accountIncome.movementsIncome.push(movement);
    console.log(accountIncome);

    return this.dataSource.getRepository(AccountEntity).save(accountIncome);
  }
}
