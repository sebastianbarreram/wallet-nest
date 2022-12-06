import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppUpdateDto } from '../../../common/storage/dtos/app-update.dto';
import { AppEntity } from '../../../common/storage/postgres/entities/app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(AppEntity)
    private readonly appRepository: Repository<AppEntity>,
  ) {}

  updateApp(id: string, app: AppUpdateDto) {}
}
