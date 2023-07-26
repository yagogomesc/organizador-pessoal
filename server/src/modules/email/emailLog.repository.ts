import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { IRegisterEmailLog } from './interfaces/registerEmailLog.interface';

@Injectable()
export class EmailLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async registerEmailLog(data: IRegisterEmailLog) {
    return this.prisma.emailLog.create({
      data,
    });
  }
}
