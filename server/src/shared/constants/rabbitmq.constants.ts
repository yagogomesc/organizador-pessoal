import * as dotenv from 'dotenv';

dotenv.config();

export const rabbitmqConstants = {
  host: process.env.RABBITMQ_HOST,
  port: Number(process.env.RABBITMQ_PORT),
  user: process.env.RABBITMQ_USER,
  pass: process.env.RABBITMQ_PASS,
};
