import { z } from 'zod';
import { loginUserSchema } from '../../schemas/loginUser.schema';

export type loginUserType = z.infer<typeof loginUserSchema>;
