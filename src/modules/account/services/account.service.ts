import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountGetByIDInterface } from '../../../common/storage/dtos/interfaces/account-get-by-id.interface';
import { MovementInterface } from '../../../common/storage/dtos/interfaces/movement.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async getAccountByIdClient(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({
      where: {
        idClient: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    return Promise.resolve(account);
  }

  async updateAccount(id: string, updateAccount: AccountUpdateDto) {
    const account = await this.getAccountByIdClient(id);
    account.balance = updateAccount.balance;
    account.credit = updateAccount.credit;
    account.updatedAt = new Date(Date.now());
    const newAccount = await this.accountRepository.save(account);
    return Promise.resolve(newAccount);
  }

  async getAccountById(id: string): Promise<AccountGetByIDInterface> {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
      relations: { client: true },
    });
    const accountGet: AccountGetByIDInterface = {
      id: id,
      photo: account.client.photo,
    };
    return Promise.resolve(accountGet);
  }

  async getMovementPhotosByAccountId(
    id: string,
  ): Promise<AccountGetByIDInterface[]> {
    const movements = await this.getMovementsByAccountId(id);
    const idAccountOutcome = new Set(
      movements.map((element) => element.idOutcome),
    );
    const idAccountIncome = new Set(
      movements.map((element) => element.idIncome),
    );
    for (const item of idAccountOutcome.values()) {
      idAccountIncome.add(item);
    }
    const images: AccountGetByIDInterface[] = [];
    for (const id of idAccountIncome) {
      const accountPhoto = await this.getAccountById(id);
      images.push(accountPhoto);
    }
    return images;
  }

  async getMovementsByAccountId(id: string) {
    const account = await this.accountRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        movementsIncome: true,
        movementsOutcome: true,
      },
    });
    const incomes = account.movementsIncome;
    const outcomes = account.movementsOutcome;
    const ids = new Set(incomes.map((element) => element.id));
    const transactions: MovementInterface[] = [
      ...incomes,
      ...outcomes.filter((item) => !ids.has(item.id)),
    ];
    return transactions;
  }
}
