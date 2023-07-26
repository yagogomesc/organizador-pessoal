import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/modules/email/email.service';
import { ISendNotifyMail } from 'src/modules/email/interfaces/sendNotifyMail.interface';
import { RabbitMQService } from 'src/modules/rabbitmq/rabbitmq.service';

@Injectable()
export class RabbitMQEmailConsumerService {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly emailService: EmailService,
  ) {}

  async initialize(queueName: string) {
    await this.rabbitMQService.initialize();
    await this.rabbitMQService.consume(
      queueName,
      this.processMessage.bind(this),
    );
  }

  private processMessage(message: ISendNotifyMail | null) {
    if (message) {
      this.emailService.sendNotifyMail(message);
    }
  }
}
