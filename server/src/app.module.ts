import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PlaceModule } from './modules/place/place.module';
import { StuffModule } from './modules/stuff/stuff.module';
import { UserModule } from './modules/user/user.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { CalendarModule } from './modules/calendar/calendar.module';
import { ExpirationDateModule } from './modules/expirationDate/expirationDate.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { mailConstants } from './shared/constants/mail.constants';
import { EmailModule } from './modules/email/email.module';
import { RabbitMQModule } from './modules/rabbitmq/rabbitmq.module';
import { join } from 'path';
import { CronModule } from './modules/cron/cron.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    UserModule,
    PlaceModule,
    StuffModule,
    CalendarModule,
    ExpirationDateModule,
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: mailConstants.host,
          port: mailConstants.port,
          auth: {
            user: mailConstants.user,
            pass: mailConstants.pass,
          },
        },
        defaults: {
          from: '"Organizer TDAH" <organizer@inbox.mailtrap.io>',
        },
        template: {
          dir: join(__dirname, 'shared', 'views', 'mail'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    EmailModule,
    CronModule,
    NotificationModule,
    RabbitMQModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
