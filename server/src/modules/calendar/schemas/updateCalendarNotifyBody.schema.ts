import { z } from 'zod';

export const updateCalendarNotifyBodySchema = z.object({
  notify: z.string().transform((val) => val === 'true'),
});
