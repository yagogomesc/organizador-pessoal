import { z } from 'zod';
import { createCalendarBodySchema } from '../../schemas/createCalendarBody.schema';

export type createCalendarBodyType = z.infer<typeof createCalendarBodySchema>;
