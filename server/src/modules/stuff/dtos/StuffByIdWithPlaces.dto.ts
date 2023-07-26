import { Place, Stuff, StuffOnPlaces } from '@prisma/client';

export interface StuffByIdWithPlaces extends Stuff {
  places: (StuffOnPlaces & { place: Place })[];
}
