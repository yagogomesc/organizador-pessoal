import { z } from 'zod';

export const updatePlaceAddAndDeleteStuffParamsSchema = z.object({
  id: z.string().uuid(),
  stuffId: z.string().uuid(),
});
