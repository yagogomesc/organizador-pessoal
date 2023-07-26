import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { ExpirationDateController } from './expirationDate.controller';
import { ExpirationDateRepository } from './expirationDate.repository';
import { ExpirationDateService } from './expirationDate.service';

@Module({
  imports: [],
  controllers: [ExpirationDateController],
  providers: [ExpirationDateRepository, ExpirationDateService, PrismaService],
})
export class ExpirationDateModule {}
