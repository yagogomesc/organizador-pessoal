import { z } from 'zod';

export const expirationDateIdParamsSchema = z.object({
  id: z.string().uuid(),
});
