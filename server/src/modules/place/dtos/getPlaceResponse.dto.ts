import { Place } from '@prisma/client';

export type IGetPlaceResponse = Omit<Place, 'userId'>;
