import { z } from 'zod';
import { createStuffSchema } from '../../schemas/createStuff.schema';

export type createStuffType = z.infer<typeof createStuffSchema>;
