import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import { AccountGetByIDInterface } from '../../../common/storage/dtos/interfaces/account-get-by-id.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/account')
@UseGuards(AuthGuard)
@ApiTags('Account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  // @Get(':id')
  getAccountByIdClient(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountByIdClient(id);
  }

  // @Put(':id')
  updateAccountByIdClient(
    @Param('id') id: string,
    @Body() updateAccount: AccountUpdateDto,
  ): Promise<AccountEntity> {
    return this.accountService.updateAccount(id, updateAccount);
  }

  @Get('full/:id')
  @ApiBearerAuth('access-token')
  getFullAccount(@Param('id') id: string) {
    return this.accountService.getFullAccount(id);
  }
}
