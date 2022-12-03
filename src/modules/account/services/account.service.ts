import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async getAccountByIdClient(id: string): Promise<AccountEntity> {
    const account = await this.dataSource.getRepository(AccountEntity).findOne({
      where: {
        idClient: id,
      },
      relations: { movementsIncome: true, movementsOutcome: true },
    });
    return Promise.resolve(account);
  }

  async updateCredit(id: string, updateAccount: AccountUpdateDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const account = await this.getAccountByIdClient(id);
      account.balance = updateAccount.balance;
      account.credit = updateAccount.credit;
      const newAccount = await queryRunner.manager.save(account);
      await queryRunner.commitTransaction();
      return Promise.resolve(newAccount);
    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Tenemos problemas para actualizar una cuenta',
        HttpStatus.CONFLICT,
      );
    }
  }
}
