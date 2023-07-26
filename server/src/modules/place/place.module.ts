import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PlaceRepository } from './place.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Module({
  imports: [],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository, PrismaService],
})
export class PlaceModule {}
