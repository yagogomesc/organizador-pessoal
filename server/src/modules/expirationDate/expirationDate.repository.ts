import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { IExpirationDateRepository } from './interfaces/expirationDateRepository.interface';
import { Prisma, ExpirationDate } from '@prisma/client';

@Injectable()
export class ExpirationDateRepository implements IExpirationDateRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async validateOwnership(
    userId: string,
    expirationDateId: string,
  ): Promise<void> {
    await this.prisma.expirationDate.findFirstOrThrow({
      where: {
        id: expirationDateId,
        userId,
      },
    });
  }

  createExpirationDate(
    data: Prisma.ExpirationDateCreateManyInput,
  ): Promise<ExpirationDate> {
    return this.prisma.expirationDate.create({
      data,
    });
  }

  getExpirationDatesByUserId(userId: string): Promise<ExpirationDate[]> {
    return this.prisma.expirationDate.findMany({ where: { userId } });
  }

  getUserExpirationDateById(
    userId: string,
    expirationDateId: string,
  ): Promise<ExpirationDate> {
    return this.prisma.expirationDate.findFirstOrThrow({
      where: { userId, id: expirationDateId },
    });
  }

  updateExpirationDateById(
    expirationDateId: string,
    expirationDate: ExpirationDate,
  ): Promise<ExpirationDate> {
    return this.prisma.expirationDate.update({
      where: { id: expirationDateId },
      data: expirationDate,
    });
  }

  async updateExpirationDateNotify(
    userId: string,
    expirationDateId: string,
    notifyStatus: boolean,
  ): Promise<ExpirationDate> {
    await this.validateOwnership(userId, expirationDateId);

    return this.prisma.expirationDate.update({
      where: { id: expirationDateId },
      data: { notify: notifyStatus },
    });
  }

  async deleteExpirationDate(
    userId: string,
    expirationDateId: string,
  ): Promise<ExpirationDate> {
    await this.validateOwnership(userId, expirationDateId);

    return this.prisma.expirationDate.delete({
      where: { id: expirationDateId },
    });
  }
}
