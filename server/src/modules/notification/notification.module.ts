import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './notification.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  providers: [NotificationService, NotificationRepository, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
