import { z } from 'zod';
import { createExpirationDateBodySchema } from '../../schemas/createExpirationDateBody.schema';

export type createExpirationDateBodyType = z.infer<
  typeof createExpirationDateBodySchema
>;
