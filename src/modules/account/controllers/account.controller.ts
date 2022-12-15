import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { AccountUpdateDto } from '../../../common/storage/dtos/account-update.dto';
import { AuthGuard } from '../../../common/guards/auth-guard';
import { AccountEntity } from '../../../common/storage/postgres/entities/account.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccountFullDto } from '../../../common/storage/dtos/account-get-full.dto';

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
  @ApiForbiddenResponse({
    schema: {
      example: {
        statusCode: 403,
        message: 'Forbidden resource',
        error: 'Forbidden',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'Client created succesfully',
    type: AccountFullDto,
  })
  @ApiParam({
    name: 'id',
    description: 'This decorator specifies the id for a specific client.',
    allowEmptyValue: false,
  })
  @ApiOperation({
    summary: 'Get account',
    description:
      'This endpoint is used to fetch the client account with movement and client image information .',
  })
  getFullAccount(@Param('id') id: string): Promise<AccountFullDto> {
    return this.accountService.getFullAccount(id);
  }
}
