import { z } from 'zod';

export const createPlaceSchema = z.object({
  name: z.string(),
});
