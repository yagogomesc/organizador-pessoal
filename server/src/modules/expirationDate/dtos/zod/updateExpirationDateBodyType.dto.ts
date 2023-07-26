import { z } from 'zod';
import { updateExpirationDateBodySchema } from '../../schemas/updateExpirationDateBody.schema';

export type updateExpirationDateBodyType = z.infer<
  typeof updateExpirationDateBodySchema
>;
