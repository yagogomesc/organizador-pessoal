import {
  Controller,
  UseFilters,
  UseGuards,
  Post,
  Get,
  Patch,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { ZodExceptionFilter } from 'src/shared/filters/zod-exception.filter';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CalendarService } from './calendar.service';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticatedRequest.interface';
import { createCalendarBodySchema } from './schemas/createCalendarBody.schema';
import { calendarIdParamsSchema } from './schemas/calendarIdParams.schema';
import { updateCalendarBodySchema } from './schemas/updateCalendarBody.schema';
import { updateCalendarNotifyBodySchema } from './schemas/updateCalendarNotifyBody.schema';

@Controller('calendars')
@UseFilters(ZodExceptionFilter)
@UseGuards(AuthGuard)
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post()
  async createCalendar(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const validatedCalendar = createCalendarBodySchema.parse(req.body);

    const calendar = await this.calendarService.createCalendar(
      sub,
      validatedCalendar,
    );

    return calendar;
  }

  @Get()
  async getCalendars(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const calendars = await this.calendarService.getCalendars(sub);

    return calendars;
  }

  @Get(':id')
  async getCalendar(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = calendarIdParamsSchema.parse(req.params);

    const calendars = await this.calendarService.getCalendar(sub, id);

    return calendars;
  }

  @Patch(':id')
  async updateCalendar(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = calendarIdParamsSchema.parse(req.params);
    const validatedCalendar = updateCalendarBodySchema.parse(req.body);

    const calendar = await this.calendarService.updateCalendar(
      sub,
      id,
      validatedCalendar,
    );

    return calendar;
  }

  @Put(':id')
  async updateCalendarNotify(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = calendarIdParamsSchema.parse(req.params);
    const { notify } = updateCalendarNotifyBodySchema.parse(req.body);

    const calendar = await this.calendarService.updateCalendarNotify(
      sub,
      id,
      notify,
    );

    return calendar;
  }

  @Delete(':id')
  async deleteCalendar(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = calendarIdParamsSchema.parse(req.params);

    const calendar = await this.calendarService.deleteCalendar(sub, id);

    return calendar;
  }
}
