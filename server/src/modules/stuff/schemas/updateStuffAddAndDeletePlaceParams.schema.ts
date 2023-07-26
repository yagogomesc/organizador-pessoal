import { z } from 'zod';

export const updateStuffAddAndDeletePlaceParamsSchema = z.object({
  id: z.string().uuid(),
  placeId: z.string().uuid(),
});
