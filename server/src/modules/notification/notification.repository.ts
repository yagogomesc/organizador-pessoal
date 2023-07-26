import { Calendar, ExpirationDate, User } from '@prisma/client';
import { INotificationRepository } from './interfaces/notificationRepository.interface';
import { PrismaService } from 'src/shared/services/prisma.service';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  getNotificationsCalendarByUser(): Promise<
    (User & {
      calendars: Calendar[];
    })[]
  > {
    return this.prisma.user.findMany({
      include: {
        calendars: {
          where: {
            notify: true,
            AND: {
              noteDate: {
                gte: startOfDay(addDays(new Date(), 1)),
                lte: endOfDay(addDays(new Date(), 1)),
              },
            },
          },
        },
      },
    });
  }

  getNotificationsExpirationDateByUser(): Promise<
    (User & {
      expirationDates: ExpirationDate[];
    })[]
  > {
    return this.prisma.user.findMany({
      include: {
        expirationDates: {
          where: {
            notify: true,
            AND: {
              expiration: {
                gte: startOfDay(addDays(new Date(), 1)),
                lte: endOfDay(addDays(new Date(), 1)),
              },
            },
          },
        },
      },
    });
  }
}
