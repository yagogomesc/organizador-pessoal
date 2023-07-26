import { z } from 'zod';

export const updateCalendarBodySchema = z.object({
  name: z.string(),
  note: z.string(),
  noteDate: z
    .string()
    .refine((value) => !!Date.parse(value), 'Data inválida')
    .transform((value) => new Date(value)),
  notify: z.string().transform((val) => val === 'true'),
});
