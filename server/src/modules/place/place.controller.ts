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
import { Place, StuffOnPlaces } from '@prisma/client';
import { ZodExceptionFilter } from 'src/shared/filters/zod-exception.filter';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AuthenticatedRequest } from 'src/shared/interfaces/authenticatedRequest.interface';
import { IGetPlaceResponse } from './dtos/getPlaceResponse.dto';
import { PlaceService } from './place.service';
import { createPlaceSchema } from './schemas/createPlace.schema';
import { placeIdParamsSchema } from './schemas/placeIdParams.schema';
import { updatePlaceAddAndDeleteStuffParamsSchema } from './schemas/updatePlaceAddAndDeleteStuffParams.schema';
import { IGetPlaceWithStuffs } from './dtos/getPlaceWithStuffsResponse.dto';

@Controller('places')
@UseFilters(ZodExceptionFilter)
@UseGuards(AuthGuard)
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {}

  @Post()
  async createPlace(@Request() req: AuthenticatedRequest): Promise<Place> {
    const { sub } = req.user;

    const validatedName = createPlaceSchema.parse(req.body);

    const place = this.placeService.createPlace(sub, {
      name: validatedName.name,
    });

    return place;
  }

  @Get()
  async getPlaces(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetPlaceResponse[]> {
    const { sub } = req.user;

    const places = await this.placeService.getPlaces(sub);

    return places;
  }

  @Get(':id')
  async getPlace(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetPlaceResponse> {
    const { sub } = req.user;

    const { id } = placeIdParamsSchema.parse(req.params);

    const place = await this.placeService.getPlace(sub, id);

    return place;
  }

  @Get(':id/stuffs')
  async getPlaceWithStuffs(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetPlaceWithStuffs> {
    const { sub } = req.user;

    const { id } = placeIdParamsSchema.parse(req.params);

    const place = await this.placeService.getPlaceWithStuffs(sub, id);

    return place;
  }

  @Patch(':id')
  async updatePlace(
    @Request() req: AuthenticatedRequest,
  ): Promise<IGetPlaceResponse> {
    const { sub } = req.user;

    const { id } = placeIdParamsSchema.parse(req.params);

    const validatedName = createPlaceSchema.parse(req.body);

    const place = await this.placeService.updatePlace(
      sub,
      id,
      validatedName.name,
    );

    return place;
  }

  @Patch(':id/stuffs/:stuffId')
  async updatePlaceAddStuff(
    @Request() req: AuthenticatedRequest,
  ): Promise<StuffOnPlaces> {
    const { sub } = req.user;

    const { id, stuffId } = updatePlaceAddAndDeleteStuffParamsSchema.parse(
      req.params,
    );

    const linkedPlaceWithStuff = await this.placeService.updatePlaceAddStuff(
      sub,
      id,
      stuffId,
    );

    return linkedPlaceWithStuff;
  }

  @Delete(':id/stuffs/:stuffId')
  async updatePlaceDeleteStuff(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id, stuffId } = updatePlaceAddAndDeleteStuffParamsSchema.parse(
      req.params,
    );

    await this.placeService.updatePlaceDeleteStuff(sub, id, stuffId);
  }

  @Delete(':id')
  async deletePlace(@Request() req: AuthenticatedRequest) {
    const { sub } = req.user;

    const { id } = placeIdParamsSchema.parse(req.params);

    await this.placeService.deletePlace(sub, id);
  }
}
