import { Calendar, ExpirationDate, User } from '@prisma/client';

export interface INotificationRepository {
  getNotificationsCalendarByUser(): Promise<
    (User & {
      calendars: Calendar[];
    })[]
  >;
  getNotificationsExpirationDateByUser(): Promise<
    (User & {
      expirationDates: ExpirationDate[];
    })[]
  >;
}
