import * as dotenv from 'dotenv';

dotenv.config();

export const mailConstants = {
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};
