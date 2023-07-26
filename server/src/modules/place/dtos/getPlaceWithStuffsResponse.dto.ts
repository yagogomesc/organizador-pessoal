import { Place, Stuff } from '@prisma/client';

export interface IGetPlaceWithStuffs extends Omit<Place, 'userId'> {
  stuff: Omit<Stuff, 'userId'>[];
}
