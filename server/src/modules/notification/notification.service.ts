import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async getNotificationsCalendar() {
    const notificationsCalendar =
      await this.notificationRepository.getNotificationsCalendarByUser();

    return notificationsCalendar
      .filter((user) => user.calendars.length > 0)
      .map((user) => {
        return {
          mailTo: user.email,
          name: user.name,
          dayNotify: user.calendars[0].noteDate,
          notifyCalendar: user.calendars.map((calendar) => {
            return {
              name: calendar.name,
              note: calendar.note,
            };
          }),
        };
      });
  }

  async getNotificationsExpirationDates() {
    const notificationsCalendar =
      await this.notificationRepository.getNotificationsExpirationDateByUser();

    return notificationsCalendar
      .filter((user) => user.expirationDates.length > 0)
      .map((user) => {
        return {
          mailTo: user.email,
          name: user.name,
          dayNotify: user.expirationDates[0].expiration,
          notifyExpirationDate: user.expirationDates.map((expiration) => {
            return {
              name: expiration.name,
            };
          }),
        };
      });
  }
}
