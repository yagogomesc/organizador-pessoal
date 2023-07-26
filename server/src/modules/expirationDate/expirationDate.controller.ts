import { ZodExceptionFilter } from 'src/shared/filters/zod-exception.filter';
import { ExpirationDateService } from './expirationDate.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
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
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticatedRequest.interface';
import { createExpirationDateBodySchema } from './schemas/createExpirationDateBody.schema';
import { updateExpirationDateBodySchema } from './schemas/updateExpirationDateBody.schema';
import { expirationDateIdParamsSchema } from './schemas/expirationDateIdParams.schema';
import { updateExpirationDateNotifyBodySchema } from './schemas/updateExpirationDateNotifyBody.schema';

@Controller('expiration-date')
@UseFilters(ZodExceptionFilter)
@UseGuards(AuthGuard)
export class ExpirationDateController {
  constructor(private readonly expirationDateService: ExpirationDateService) {}

  @Post()
  async createExpirationDate(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const validatedExpirationDate = createExpirationDateBodySchema.parse(
      req.body,
    );

    const expirationDate =
      await this.expirationDateService.createExpirationDate(
        sub,
        validatedExpirationDate,
      );

    return expirationDate;
  }

  @Get()
  async getExpirationDates(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const expirationDates = await this.expirationDateService.getExpirationDates(
      sub,
    );

    return expirationDates;
  }

  @Get(':id')
  async getExpirationDate(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = expirationDateIdParamsSchema.parse(req.params);

    const expirationDate = await this.expirationDateService.getExpirationDate(
      sub,
      id,
    );

    return expirationDate;
  }

  @Patch(':id')
  async updateExpirationDate(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = expirationDateIdParamsSchema.parse(req.params);
    const validatedExpirationDate = updateExpirationDateBodySchema.parse(
      req.body,
    );

    const expirationDate =
      await this.expirationDateService.updateExpirationDate(
        sub,
        id,
        validatedExpirationDate,
      );

    return expirationDate;
  }

  @Put(':id')
  async updateExpirationDateNotify(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = expirationDateIdParamsSchema.parse(req.params);
    const { notify } = updateExpirationDateNotifyBodySchema.parse(req.body);

    const expirationDate =
      await this.expirationDateService.updateExpirationDateNotify(
        sub,
        id,
        notify,
      );

    return expirationDate;
  }

  @Delete(':id')
  async deleteExpirationDate(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = expirationDateIdParamsSchema.parse(req.params);

    const expirationDate =
      await this.expirationDateService.deleteExpirationDate(sub, id);

    return expirationDate;
  }
}
