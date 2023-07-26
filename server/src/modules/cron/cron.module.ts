import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationModule } from '../notification/notification.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CronService } from './cron.service';
import { RabbitMQEmailConsumerService } from 'src/shared/services/rabbitMQEmailConsumer.service';
import { EmailService } from '../email/email.service';
import { EmailLogRepository } from '../email/emailLog.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot(), NotificationModule],
  providers: [
    CronService,
    RabbitMQService,
    RabbitMQEmailConsumerService,
    EmailService,
    EmailLogRepository,
    PrismaService,
  ],
  exports: [CronService],
})
export class CronModule {}
