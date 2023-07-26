import { z } from 'zod';

export const createStuffSchema = z.object({
  name: z.string(),
});
