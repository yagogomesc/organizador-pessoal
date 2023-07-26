import { Place, Stuff, StuffOnPlaces } from '@prisma/client';

export interface PlaceByIdWithStuffs extends Place {
  stuffs: (StuffOnPlaces & { stuff: Stuff })[];
}
