import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { AccountGetByIDInterface } from '../../../common/storage/dtos/interfaces/account-get-by-id.interface';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdClient(id);
  }

  @Get('accountId/:id')
  getAccountByIdAccount(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdAccount(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateAccountByIdClient(
    @Param('id') id: string,
    @Body() updateAccount: AccountUpdateDto,
  ): Promise<AccountEntity> {
    return this.accountService.updateAccount(id, updateAccount);
  }

  @Get('images/:id')
  getMovementPhotosByAccountId(
    @Param('id') id: string,
  ): Promise<AccountGetByIDInterface[]> {
    return this.accountService.getMovementPhotosByAccountId(id);
  }

  @Get('movements/:id')
  getMovementsByAccountId(@Param('id') id: string) {
    return this.accountService.getMovementsByAccountId(id);
  }

  @Get('full/:id')
  getFullAccount(@Param('id') id: string) {
    return this.accountService.getFullAccount(id);
  }
}
