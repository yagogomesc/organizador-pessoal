import { z } from 'zod';
import { createPlaceSchema } from '../../schemas/createPlace.schema';

export type createPlaceType = z.infer<typeof createPlaceSchema>;
