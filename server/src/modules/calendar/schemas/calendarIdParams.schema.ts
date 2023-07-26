import { z } from 'zod';

export const calendarIdParamsSchema = z.object({
  id: z.string().uuid(),
});
