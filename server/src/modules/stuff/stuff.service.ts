import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Stuff } from '@prisma/client';
import { StuffRepository } from './stuff.repository';
import { IGetStuffResponse } from './dtos/getStuffResponse.dto';
import { createStuffType } from './dtos/zod/createStuffType.dto';

@Injectable()
export class StuffService {
  constructor(private readonly stuffRepository: StuffRepository) {}

  async createStuff(userId: string, { name }: createStuffType): Promise<Stuff> {
    const stuffAlreadyExists =
      await this.stuffRepository.getStuffByUserIdAndName(userId, name);

    if (stuffAlreadyExists) {
      throw new ConflictException('Já existe um objeto com esse nome.');
    }

    const stuff = await this.stuffRepository.createStuff({ name, userId });

    return stuff;
  }

  async getStuffs(userId: string): Promise<IGetStuffResponse[]> {
    const stuffs = await this.stuffRepository.getStuffsByUserId(userId);

    return stuffs;
  }

  async getStuff(
    userId: string,
    stuffId: string,
  ): Promise<IGetStuffResponse | null> {
    const stuff = await this.stuffRepository.getStuffById(stuffId);

    if ((stuff && stuff.userId !== userId) || !stuff) {
      throw new NotFoundException('Objeto não encontrado.');
    }

    return stuff;
  }

  async getStuffWithPlaces(userId: string, placeId: string) {
    const placeExists = await this.stuffRepository.getStuffById(placeId);

    if ((placeExists && placeExists.userId !== userId) || !placeExists) {
      throw new NotFoundException('Objeto não encontrado.');
    }

    const stuffWithPlaces = await this.stuffRepository.getStuffByIdWithPlaces(
      placeId,
    );

    const result = stuffWithPlaces.map((stuff) => {
      return {
        id: stuff.id,
        name: stuff.name,
        places: stuff.places.map((place) => {
          return { id: place.place.id, name: place.place.name };
        }),
      };
    });

    return result;
  }

  async updateStuff(
    userId: string,
    stuffId: string,
    newName: string,
  ): Promise<Stuff> {
    const stuffNameAlreadyExists =
      await this.stuffRepository.getStuffByUserIdAndName(userId, newName);

    if (stuffNameAlreadyExists) {
      throw new ConflictException('Já existe um objeto com esse nome.');
    }

    const updatedStuff = await this.stuffRepository.updateStuffById(
      stuffId,
      newName,
    );

    return updatedStuff;
  }

  async updateStuffAddPlace(userId: string, stuffId: string, placeId: string) {
    const stuffBelongsToUser = await this.stuffRepository.getStuffByIdAndUserId(
      stuffId,
      userId,
    );

    if (!stuffBelongsToUser) {
      throw new ConflictException('Objeto não encontrado.');
    }

    const linkedStuffWithPlace = await this.stuffRepository.updateStuffAddPlace(
      stuffId,
      placeId,
    );

    return linkedStuffWithPlace;
  }
  async updateStuffDeletePlace(
    userId: string,
    stuffId: string,
    placeId: string,
  ) {
    const stuffBelongsToUser = await this.stuffRepository.getStuffByIdAndUserId(
      stuffId,
      userId,
    );

    if (!stuffBelongsToUser) {
      throw new ConflictException('Objeto não encontrado.');
    }

    await this.stuffRepository.updateStuffDeletePlace(stuffId, placeId);
  }

  async deleteStuff(userId: string, stuffId: string): Promise<void> {
    const stuffExists = await this.stuffRepository.getStuffById(stuffId);

    if ((stuffExists && stuffExists.userId !== userId) || !stuffExists) {
      throw new NotFoundException('Objeto não encontrado.');
    }

    await this.stuffRepository.deleteStuff(stuffId);
  }
}
