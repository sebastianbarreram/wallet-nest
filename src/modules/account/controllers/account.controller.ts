import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';

@Controller('api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get(':id')
  getAccountByIdClient(@Param('id') id: string) {
    return this.accountService.getAccountByIdClient(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateAccountByIdClient(
    @Param('id') id: string,
    @Body() updateAccount: AccountUpdateDto,
  ) {
    return this.accountService.updateAccount(id, updateAccount);
  }
}
