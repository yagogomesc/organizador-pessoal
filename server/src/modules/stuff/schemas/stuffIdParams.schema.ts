import { z } from 'zod';

export const stuffIdParamsSchema = z.object({
  id: z.string().uuid(),
});
