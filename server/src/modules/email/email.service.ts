import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendNotifyMail } from './interfaces/sendNotifyMail.interface';
import { DateUtils } from 'src/shared/utils/date.utils';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { EmailLogRepository } from './emailLog.repository';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly emailLogRepository: EmailLogRepository,
  ) {}

  public async sendNotifyMail({
    mailTo,
    dayNotify,
    name,
    notifyCalendar,
    notifyExpirationDate,
  }: ISendNotifyMail): Promise<void> {
    const notifyDate = new Date(dayNotify);
    await this.mailerService
      .sendMail({
        to: mailTo,
        subject: 'Lembretes',
        template: 'notifyStandard',
        context: {
          name,
          dayNotify: DateUtils.formatarData(
            new Date(notifyDate.setDate(notifyDate.getDate() + 1)),
          ),
          notifyCalendar,
          notifyExpirationDate,
        },
      })
      .then(() => {
        this.emailLogRepository.registerEmailLog({
          subject: 'Lembretes',
          recipientEmail: mailTo,
          body: JSON.stringify(
            `${
              notifyCalendar
                ? notifyCalendar.map((calendar) => JSON.stringify(calendar))
                : ''
            } ${notifyCalendar && notifyExpirationDate ? ',' : ''} ${
              notifyExpirationDate
                ? notifyExpirationDate.map((expirationDate) =>
                    JSON.stringify(expirationDate),
                  )
                : ''
            }`,
          ),
          isSuccess: true,
        });
      })
      .catch(() => {
        this.emailLogRepository.registerEmailLog({
          subject: 'Lembretes',
          recipientEmail: mailTo,
          body: `${notifyCalendar} ${
            notifyCalendar && notifyExpirationDate ? ',' : ''
          } ${notifyExpirationDate}`,
          isSuccess: false,
        });
      });
  }

  async addToQueueForEmail(notification: ISendNotifyMail): Promise<void> {
    await this.rabbitMQService.sendToQueue('notify-emails', notification);
  }
}
