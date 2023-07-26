import { z } from 'zod';

export const updateExpirationDateNotifyBodySchema = z.object({
  notify: z.string().transform((val) => val === 'true'),
});
