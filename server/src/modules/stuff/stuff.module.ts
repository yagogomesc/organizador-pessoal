import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { StuffController } from './stuff.controller';
import { StuffRepository } from './stuff.repository';
import { StuffService } from './stuff.service';

@Module({
  imports: [],
  controllers: [StuffController],
  providers: [PrismaService, StuffRepository, StuffService],
})
export class StuffModule {}
