import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Stuff } from '@prisma/client';
import { ZodExceptionFilter } from 'src/shared/filters/zod-exception.filter';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticatedRequest.interface';
import { IGetStuffResponse } from './dtos/getStuffResponse.dto';
import { createStuffSchema } from './schemas/createStuff.schema';
import { stuffIdParamsSchema } from './schemas/stuffIdParams.schema';

import { StuffService } from './stuff.service';
import { updateStuffAddAndDeletePlaceParamsSchema } from './schemas/updateStuffAddAndDeletePlaceParams.schema';

@Controller('stuffs')
@UseFilters(ZodExceptionFilter)
@UseGuards(AuthGuard)
export class StuffController {
  constructor(private readonly stuffService: StuffService) {}

  @Post()
  async createStuff(@Request() req: AuthenticatedRequest): Promise<Stuff> {
    const { sub } = req.user;

    const validatedName = createStuffSchema.parse(req.body);

    const stuff = this.stuffService.createStuff(sub, {
      name: validatedName.name,
    });

    return stuff;
  }

  @Get()
  async getStuffs(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetStuffResponse[]> {
    const { sub } = req.user;

    const stuffs = await this.stuffService.getStuffs(sub);

    return stuffs;
  }

  @Get(':id')
  async getStuff(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetStuffResponse> {
    const { sub } = req.user;

    const { id } = stuffIdParamsSchema.parse(req.params);

    const stuff = await this.stuffService.getStuff(sub, id);

    return stuff;
  }

  @Get(':id/places')
  async getStuffWithPlaces(@Request() req: AuthenticatedRequest): Promise<any> {
    const { sub } = req.user;

    const { id } = stuffIdParamsSchema.parse(req.params);

    const place = await this.stuffService.getStuffWithPlaces(sub, id);

    return place;
  }

  @Patch(':id')
  async updateStuff(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetStuffResponse> {
    const { sub } = req.user;

    const { id } = stuffIdParamsSchema.parse(req.params);

    const validatedName = createStuffSchema.parse(req.body);

    const stuff = await this.stuffService.updateStuff(
      sub,
      id,
      validatedName.name,
    );

    return stuff;
  }

  @Patch(':id/places/:placeId')
  async updateStuffAddPlace(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id, placeId } = updateStuffAddAndDeletePlaceParamsSchema.parse(
      req.params,
    );

    const linkedPlaceWithStuff = this.stuffService.updateStuffAddPlace(
      sub,
      id,
      placeId,
    );

    return linkedPlaceWithStuff;
  }

  @Delete(':id/places/:placeId')
  async updateStuffDeletePlace(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id, placeId } = updateStuffAddAndDeletePlaceParamsSchema.parse(
      req.params,
    );

    await this.stuffService.updateStuffDeletePlace(sub, id, placeId);
  }

  @Delete(':id')
  async deleteStuff(@Request() req: AuthenticatedRequest): Promise<void> {
    const { sub } = req.user;

    const { id } = stuffIdParamsSchema.parse(req.params);

    await this.stuffService.deleteStuff(sub, id);
  }
}
