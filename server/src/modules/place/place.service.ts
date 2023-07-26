import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { createPlaceType } from './dtos/zod/createPlaceType.dto';
import { Place } from '@prisma/client';
import { IGetPlaceResponse } from './dtos/getPlaceResponse.dto';
import { IGetPlaceWithStuffs } from './dtos/getPlaceWithStuffsResponse.dto';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async createPlace(userId: string, { name }: createPlaceType): Promise<Place> {
    const placeAlreadyExists =
      await this.placeRepository.getPlaceByUserIdAndName(userId, name);

    if (placeAlreadyExists) {
      throw new ConflictException('Já existe um local com esse nome.');
    }

    const place = await this.placeRepository.createPlace({ name, userId });

    return place;
  }

  async getPlaces(userId: string): Promise<IGetPlaceResponse[]> {
    const places = await this.placeRepository.getPlacesByUserId(userId);

    return places;
  }

  async getPlace(
    userId: string,
    placeId: string,
  ): Promise<IGetPlaceResponse | null> {
    const place = await this.placeRepository.getPlaceById(placeId);

    if ((place && place.userId !== userId) || !place) {
      throw new NotFoundException('Local não encontrado.');
    }

    return place;
  }

  async getPlaceWithStuffs(
    userId: string,
    placeId: string,
  ): Promise<IGetPlaceWithStuffs> {
    const placeExists = await this.placeRepository.getPlaceById(placeId);

    if ((placeExists && placeExists.userId !== userId) || !placeExists) {
      throw new NotFoundException('Local não encontrado.');
    }

    const placeWithStuffs = await this.placeRepository.getPlaceByIdWithStuffs(
      placeId,
    );

    const result = placeWithStuffs.map((place) => {
      return {
        id: place.id,
        name: place.name,
        stuff: place.stuffs.map((stuff) => {
          return { id: stuff.stuff.id, name: stuff.stuff.name };
        }),
      };
    });

    return result[0];
  }

  async updatePlace(
    userId: string,
    placeId: string,
    newName: string,
  ): Promise<Place> {
    const placeNameAlreadyExists =
      await this.placeRepository.getPlaceByUserIdAndName(userId, newName);

    if (placeNameAlreadyExists) {
      throw new ConflictException('Já existe um local com esse nome.');
    }

    const updatedPlace = await this.placeRepository.updatePlaceById(
      placeId,
      newName,
    );

    return updatedPlace;
  }

  async updatePlaceAddStuff(userId: string, placeId: string, stuffId: string) {
    const placeBelongsToUser = await this.placeRepository.getPlaceByIdAndUserId(
      placeId,
      userId,
    );

    if (!placeBelongsToUser) {
      throw new ConflictException('Local não encontrado.');
    }

    const linkedPlaceWithStuff = await this.placeRepository.updatePlaceAddStuff(
      placeId,
      stuffId,
    );

    return linkedPlaceWithStuff;
  }

  async updatePlaceDeleteStuff(
    userId: string,
    placeId: string,
    stuffId: string,
  ) {
    const placeExists = await this.placeRepository.getPlaceById(placeId);

    if ((placeExists && placeExists.userId !== userId) || !placeExists) {
      throw new NotFoundException('Local não encontrado.');
    }

    await this.placeRepository.updatePlaceDeleteStuff(placeId, stuffId);
  }

  async deletePlace(userId: string, placeId: string) {
    const placeExists = await this.placeRepository.getPlaceById(placeId);

    if ((placeExists && placeExists.userId !== userId) || !placeExists) {
      throw new NotFoundException('Local não encontrado.');
    }

    await this.placeRepository.deletePlace(placeId);
  }
}
