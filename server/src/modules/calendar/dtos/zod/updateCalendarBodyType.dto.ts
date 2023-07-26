import { z } from 'zod';
import { updateCalendarBodySchema } from '../../schemas/updateCalendarBody.schema';

export type updateCalendarBodyType = z.infer<typeof updateCalendarBodySchema>;
