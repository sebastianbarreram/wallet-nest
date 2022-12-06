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

  async updateApp(id: string, updateApp: AppUpdateDto) {
    const app = await this.getAppByIdClient(id);
    app.color = updateApp.color;
    app.updatedAt = new Date(Date.now());
    const newApp = await this.appRepository.save(app);
    return Promise.resolve(newApp);
  }

  async getAppByIdClient(id: string): Promise<AppEntity> {
    const account = await this.appRepository.findOne({
      where: {
        idClient: id,
      },
    });
    return Promise.resolve(account);
  }
}
