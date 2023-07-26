import { ExpirationDate, Prisma } from '@prisma/client';

export interface IExpirationDateRepository {
  createExpirationDate(
    data: Prisma.ExpirationDateCreateManyInput,
  ): Promise<ExpirationDate>;
  getExpirationDatesByUserId(userId: string): Promise<ExpirationDate[]>;
  getUserExpirationDateById(
    userId: string,
    expirationDateId: string,
  ): Promise<ExpirationDate>;
  updateExpirationDateById(
    expirationDateId: string,
    expirationDate: ExpirationDate,
  ): Promise<ExpirationDate>;
  updateExpirationDateNotify(
    userId: string,
    expirationDateId: string,
    notifyStatus: boolean,
  ): Promise<ExpirationDate>;
  deleteExpirationDate(
    userId: string,
    expirationDateId: string,
  ): Promise<ExpirationDate | null>;
}
