import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { InjectRepository } from '@nestjs/typeorm';

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
      relations: { movementsIncome: true, movementsOutcome: true },
    });
    return Promise.resolve(account);
  }

  async updateAccount(id: string, updateAccount: AccountUpdateDto) {
    const account = await this.getAccountByIdClient(id);
    account.balance = updateAccount.balance;
    account.credit = updateAccount.credit;
    const newAccount = await this.accountRepository.save(account);
    return Promise.resolve(newAccount);
  }
}
