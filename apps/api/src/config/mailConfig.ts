import { registerAs } from '@nestjs/config';

export const mailConfig = registerAs('mail', () => ({
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  email: process.env.MAIL_EMAIL,
  pass: process.env.MAIL_PASS,
}));

export type MailConfig = ReturnType<typeof mailConfig>;
