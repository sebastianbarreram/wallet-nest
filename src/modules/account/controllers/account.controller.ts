import { Controller, Get, Param, Put } from '@nestjs/common';
import { AccountService } from '../services/account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string) {
    return this.accountService.getAccountByIdClient(id);
  }

  @Put(':id')
  updateCreditByIdClient(@Param('id') id: string) {
    this.accountService.updateCredit(id);
  }
}
