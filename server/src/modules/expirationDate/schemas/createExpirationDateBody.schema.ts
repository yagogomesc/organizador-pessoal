import { z } from 'zod';

export const createExpirationDateBodySchema = z.object({
  name: z.string(),
  expiration: z
    .string()
    .refine((value) => !!Date.parse(value), 'Data inválida')
    .transform((value) => new Date(value)),
  notify: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
});
