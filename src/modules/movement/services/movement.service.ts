import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUpdateDto } from 'src/common/storage/dtos/account-update.dto';
import { Repository } from 'typeorm';
import { MovementCreateDto } from '../../../common/storage/dtos/movement-create.dto';
import { MovementEntity } from '../../../common/storage/postgres/entities/movement.entity';
import { AccountService } from '../../account/services/account.service';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {}

  async createMovement(
    movementInput: MovementCreateDto,
  ): Promise<MovementEntity> {
    const movement = new MovementEntity(movementInput);
    const accountIncome = await this.accountService.getAccountByIdAccount(
      movement.idIncome,
    );
    const accountOutcome = await this.accountService.getAccountByIdAccount(
      movement.idOutcome,
    );
    if (movement.idIncome !== movement.idOutcome) {
      const newBalaceAccountIncome =
        Number(accountIncome.balance) + movement.amount;
      accountIncome.balance = newBalaceAccountIncome.toString();
      accountIncome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountIncome.idClient,
        accountIncome,
      );

      const newBalaceAccountOutcome =
        Number(accountOutcome.balance) - movement.amount;
      accountOutcome.balance = newBalaceAccountOutcome.toString();
      accountOutcome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountOutcome.idClient,
        accountOutcome,
      );
    } else {
      const newBalanceLoan = Number(accountIncome.balance) + movement.amount;
      accountIncome.balance = newBalanceLoan.toString();
      const newCredit = Number(accountIncome.credit) - movement.amount;
      accountIncome.credit = newCredit.toString();
      accountIncome.updatedAt = new Date(Date.now());
      await this.accountService.updateAccount(
        accountIncome.idClient,
        accountIncome,
      );
    }

    return this.movementRepository.save(movement);
  }
}
