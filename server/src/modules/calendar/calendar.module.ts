import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CalendarController } from './calendar.controller';
import { CalendarRepository } from './calendar.repository';
import { CalendarService } from './calendar.service';

@Module({
  imports: [],
  controllers: [CalendarController],
  providers: [CalendarRepository, CalendarService, PrismaService],
})
export class CalendarModule {}
