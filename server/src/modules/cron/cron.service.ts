import { Cron } from '@nestjs/schedule';
import { NotificationService } from '../notification/notification.service';
import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RabbitMQEmailConsumerService } from 'src/shared/services/rabbitMQEmailConsumer.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class CronService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly rabbitMQEmailConsumerService: RabbitMQEmailConsumerService,
  ) {}

  @Cron('0 0 * * *') // Todos os dias meia noite
  async cronNotificationsCalendar() {
    await this.rabbitMQService.initialize();
    await this.rabbitMQEmailConsumerService.initialize('notify-emails');
    const notifications =
      await this.notificationService.getNotificationsCalendar();

    for (const notification of notifications) {
      await this.emailService.addToQueueForEmail(notification);
    }

    await this.rabbitMQService.close();
  }

  @Cron('30 0 * * *') //Todos os dias meia noite e meia
  async cronNotificationsExpirationDate() {
    await this.rabbitMQService.initialize();
    await this.rabbitMQEmailConsumerService.initialize('notify-emails');
    const notifications =
      await this.notificationService.getNotificationsExpirationDates();

    for (const notification of notifications) {
      await this.emailService.addToQueueForEmail(notification);
    }

    await this.rabbitMQService.close();
  }
}
