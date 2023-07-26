import { ExpirationDate } from '@prisma/client';
import { ExpirationDateRepository } from './expirationDate.repository';
import { Injectable } from '@nestjs/common';
import { createExpirationDateBodyType } from './dtos/zod/createExpirationDateBodyType.dto';
import { updateExpirationDateBodyType } from './dtos/zod/updateExpirationDateBodyType.dto';

@Injectable()
export class ExpirationDateService {
  constructor(
    private readonly expirationDateRepository: ExpirationDateRepository,
  ) {}

  createExpirationDate(
    userId: string,
    { name, expiration, notify }: createExpirationDateBodyType,
  ): Promise<ExpirationDate> {
    return this.expirationDateRepository.createExpirationDate({
      userId,
      name,
      expiration,
      notify,
    });
  }

  getExpirationDates(userId: string): Promise<ExpirationDate[]> {
    return this.expirationDateRepository.getExpirationDatesByUserId(userId);
  }

  getExpirationDate(
    userId: string,
    expirationDateId: string,
  ): Promise<ExpirationDate> {
    return this.expirationDateRepository.getUserExpirationDateById(
      userId,
      expirationDateId,
    );
  }

  async updateExpirationDate(
    userId: string,
    expirationDateId: string,
    newValues: updateExpirationDateBodyType,
  ): Promise<ExpirationDate> {
    const expirationDate =
      await this.expirationDateRepository.getUserExpirationDateById(
        userId,
        expirationDateId,
      );

    Object.keys(expirationDate).forEach((key) => {
      if (newValues.hasOwnProperty(key)) {
        expirationDate[key] = newValues[key];
      }
    });

    const updatedExpirationDate =
      await this.expirationDateRepository.updateExpirationDateById(
        expirationDateId,
        expirationDate,
      );

    return updatedExpirationDate;
  }

  updateExpirationDateNotify(
    userId: string,
    expirationDateId: string,
    newNotifyStatus: boolean,
  ): Promise<ExpirationDate> {
    return this.expirationDateRepository.updateExpirationDateNotify(
      userId,
      expirationDateId,
      newNotifyStatus,
    );
  }

  async deleteExpirationDate(
    userId: string,
    expirationDateId: string,
  ): Promise<void> {
    await this.expirationDateRepository.deleteExpirationDate(
      userId,
      expirationDateId,
    );
  }
}
