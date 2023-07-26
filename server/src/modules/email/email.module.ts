import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { EmailLogRepository } from './emailLog.repository';

@Module({
  providers: [EmailService, RabbitMQService, PrismaService, EmailLogRepository],
  exports: [EmailService],
})
export class EmailModule {}
