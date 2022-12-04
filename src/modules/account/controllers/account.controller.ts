import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string) {
    return this.accountService.getAccountByIdClient(id);
  }

  @Put(':id')
  updateCreditByIdClient(
    @Param('id') id: string,
    @Body() updateAccount: AccountUpdateDto,
  ) {
    return this.accountService.updateAccount(id, updateAccount);
  }
}
