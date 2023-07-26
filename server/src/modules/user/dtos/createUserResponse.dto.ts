import { User } from '@prisma/client';

export type ICreateUserResponse = Omit<User, 'password'>;
