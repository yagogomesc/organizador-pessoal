import { z } from 'zod';

export const placeIdParamsSchema = z.object({
  id: z.string().uuid(),
});
