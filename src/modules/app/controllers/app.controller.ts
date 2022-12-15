import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';
import { AppService } from '../services/app.service';
import { AuthGuard } from '../../../common/guards/auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('api/app')
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  updateApp(
    @Param('id') id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    updateApp: AppUpdateDto,
  ) {
    return this.appService.updateApp(id, updateApp);
  }
}
