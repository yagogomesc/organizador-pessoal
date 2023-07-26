import { createUserSchema } from '../../schemas/createUser.schema';
import { z } from 'zod';

export type createUserType = z.infer<typeof createUserSchema>;
