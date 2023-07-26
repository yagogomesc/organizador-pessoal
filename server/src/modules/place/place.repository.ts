import { Injectable } from '@nestjs/common';
import { Place, Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { IGetPlaceResponse } from './dtos/getPlaceResponse.dto';
import { PlaceByIdWithStuffs } from './dtos/PlaceByIdWithStuffsResponse.dto';

@Injectable()
export class PlaceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPlace(data: Prisma.PlaceCreateManyInput): Promise<Place> {
    return this.prisma.place.create({ data });
  }

  async getPlacesByUserId(userId: string): Promise<IGetPlaceResponse[]> {
    return this.prisma.place.findMany({
      where: { userId },
      select: { id: true, name: true, userId: false },
    });
  }

  async getPlaceById(placeId: string): Promise<Place> {
    return this.prisma.place.findUnique({ where: { id: placeId } });
  }

  async getPlaceByIdWithStuffs(
    placeId: string,
  ): Promise<PlaceByIdWithStuffs[]> {
    return this.prisma.place.findMany({
      where: { id: placeId },
      include: {
        stuffs: {
          include: { stuff: true },
        },
      },
    });
  }

  async getPlaceByUserIdAndName(
    userId: string,
    placeName: string,
  ): Promise<IGetPlaceResponse | null> {
    return this.prisma.place.findFirst({
      where: { name: placeName, AND: { userId } },
    });
  }

  async getPlaceByIdAndUserId(
    placeId: string,
    userId: string,
  ): Promise<IGetPlaceResponse | null> {
    return this.prisma.place.findFirst({
      where: { id: placeId, AND: { userId } },
    });
  }

  async updatePlaceById(placeId: string, newName: string): Promise<Place> {
    return this.prisma.place.update({
      where: { id: placeId },
      data: { name: newName },
    });
  }

  async updatePlaceAddStuff(placeId: string, stuffId: string) {
    return this.prisma.stuffOnPlaces.create({
      data: {
        placeId,
        stuffId,
      },
    });
  }

  async deletePlace(placeId: string): Promise<Place | null> {
    return this.prisma.place.delete({ where: { id: placeId } });
  }

  async updatePlaceDeleteStuff(placeId: string, stuffId: string) {
    return this.prisma.stuffOnPlaces.deleteMany({
      where: {
        placeId,
        AND: {
          stuffId,
        },
      },
    });
  }
}
