import { Stuff } from '@prisma/client';

export type IGetStuffResponse = Omit<Stuff, 'userId'>;
