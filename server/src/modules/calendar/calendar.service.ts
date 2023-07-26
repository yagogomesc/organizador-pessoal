import { Injectable } from '@nestjs/common';
import { Calendar } from '@prisma/client';
import { CalendarRepository } from './calendar.repository';
import { createCalendarBodyType } from './dtos/zod/createCalendarBodyType.dto';
import { updateCalendarBodyType } from './dtos/zod/updateCalendarBodyType.dto';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  createCalendar(
    userId: string,
    { name, note, noteDate, notify }: createCalendarBodyType,
  ): Promise<Calendar> {
    return this.calendarRepository.createCalendar({
      userId,
      name,
      note,
      noteDate,
      notify,
    });
  }

  getCalendars(userId: string): Promise<Calendar[]> {
    return this.calendarRepository.getCalendarsByUserId(userId);
  }

  getCalendar(userId: string, calendarId: string): Promise<Calendar> {
    return this.calendarRepository.getUserCalendarById(userId, calendarId);
  }

  async updateCalendar(
    userId: string,
    calendarId: string,
    newValues: updateCalendarBodyType,
  ): Promise<Calendar> {
    const calendar = await this.calendarRepository.getUserCalendarById(
      userId,
      calendarId,
    );

    Object.keys(calendar).forEach((key) => {
      if (newValues.hasOwnProperty(key)) {
        calendar[key] = newValues[key];
      }
    });

    const updatedCalendar = await this.calendarRepository.updateCalendarById(
      calendarId,
      calendar,
    );

    return updatedCalendar;
  }

  updateCalendarNotify(
    userId: string,
    calendarId: string,
    newNotifyStatus: boolean,
  ): Promise<Calendar> {
    return this.calendarRepository.updateCalendarNotify(
      userId,
      calendarId,
      newNotifyStatus,
    );
  }

  async deleteCalendar(userId: string, calendarId: string): Promise<void> {
    await this.calendarRepository.deleteCalendar(userId, calendarId);
  }
}
