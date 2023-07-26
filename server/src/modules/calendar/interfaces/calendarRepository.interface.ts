import { Calendar, Prisma } from '@prisma/client';

export interface ICalendarRepository {
  createCalendar(data: Prisma.CalendarCreateManyInput): Promise<Calendar>;
  getCalendarsByUserId(userId: string): Promise<Calendar[]>;
  getUserCalendarById(userId: string, calendarId: string): Promise<Calendar>;
  updateCalendarById(calendarId: string, calendar: Calendar): Promise<Calendar>;
  updateCalendarNotify(
    userId: string,
    calendarId: string,
    notifyStatus: boolean,
  ): Promise<Calendar>;
  deleteCalendar(userId: string, calendarId: string): Promise<Calendar | null>;
}
