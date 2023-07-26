import { Injectable } from '@nestjs/common';
import { Calendar, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ICalendarRepository } from './interfaces/calendarRepository.interface';

@Injectable()
export class CalendarRepository implements ICalendarRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async validateOwnership(
    userId: string,
    calendarId: string,
  ): Promise<void> {
    await this.prisma.calendar.findFirstOrThrow({
      where: {
        id: calendarId,
        userId,
      },
    });
  }

  createCalendar(data: Prisma.CalendarCreateManyInput): Promise<Calendar> {
    return this.prisma.calendar.create({ data });
  }

  getCalendarsByUserId(userId: string): Promise<Calendar[]> {
    return this.prisma.calendar.findMany({
      where: {
        userId,
      },
    });
  }

  getUserCalendarById(userId: string, calendarId: string): Promise<Calendar> {
    return this.prisma.calendar.findFirstOrThrow({
      where: { id: calendarId, userId },
    });
  }

  async updateCalendarById(
    calendarId: string,
    calendar: Calendar,
  ): Promise<Calendar> {
    return this.prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: calendar,
    });
  }

  async updateCalendarNotify(
    userId: string,
    calendarId: string,
    notifyStatus: boolean,
  ): Promise<Calendar> {
    await this.validateOwnership(userId, calendarId);

    return this.prisma.calendar.update({
      where: {
        id: calendarId,
      },
      data: {
        notify: notifyStatus,
      },
    });
  }

  async deleteCalendar(
    userId: string,
    calendarId: string,
  ): Promise<Calendar | null> {
    await this.validateOwnership(userId, calendarId);

    return this.prisma.calendar.delete({ where: { id: calendarId } });
  }
}
