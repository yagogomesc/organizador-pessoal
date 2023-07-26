import { Injectable } from '@nestjs/common';
import { Prisma, Stuff } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { IGetStuffResponse } from './dtos/getStuffResponse.dto';
import { StuffByIdWithPlaces } from './dtos/StuffByIdWithPlaces.dto';

@Injectable()
export class StuffRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createStuff(data: Prisma.StuffCreateManyInput): Promise<Stuff> {
    return this.prisma.stuff.create({ data });
  }

  async getStuffsByUserId(userId: string): Promise<IGetStuffResponse[]> {
    return this.prisma.stuff.findMany({
      where: { userId },
      select: { id: true, name: true, userId: false },
    });
  }

  async getStuffById(stuffId: string): Promise<Stuff> {
    return this.prisma.stuff.findUnique({ where: { id: stuffId } });
  }

  async getStuffByIdWithPlaces(
    stuffId: string,
  ): Promise<StuffByIdWithPlaces[]> {
    return this.prisma.stuff.findMany({
      where: { id: stuffId },
      include: {
        places: {
          include: { place: true },
        },
      },
    });
  }

  async getStuffByUserIdAndName(
    userId: string,
    stuffName: string,
  ): Promise<IGetStuffResponse | null> {
    return this.prisma.stuff.findFirst({
      where: { name: stuffName, AND: { userId } },
    });
  }

  async getStuffByIdAndUserId(
    stuffId: string,
    userId: string,
  ): Promise<IGetStuffResponse | null> {
    return this.prisma.stuff.findFirst({
      where: { id: stuffId, AND: { userId } },
    });
  }

  async updateStuffById(stuffId: string, newName: string): Promise<Stuff> {
    return this.prisma.stuff.update({
      where: { id: stuffId },
      data: { name: newName },
    });
  }

  async updateStuffAddPlace(stuffId: string, placeId: string) {
    return this.prisma.stuffOnPlaces.create({
      data: {
        placeId,
        stuffId,
      },
    });
  }

  async deleteStuff(stuffId: string): Promise<Stuff | null> {
    return this.prisma.stuff.delete({ where: { id: stuffId } });
  }

  async updateStuffDeletePlace(stuffId: string, placeId: string) {
    return this.prisma.stuffOnPlaces.deleteMany({
      where: {
        stuffId,
        AND: {
          placeId,
        },
      },
    });
  }
}
