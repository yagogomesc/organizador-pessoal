import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ICreateUserResponse } from './dtos/createUserResponse.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<ICreateUserResponse> {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
