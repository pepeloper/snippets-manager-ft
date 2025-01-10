import keys from '../constants.config.js';
import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, body }) => {
  const { MAIL } = keys;
  const transporter = nodemailer.createTransport({
    host: MAIL.HOST,
    secureConnection: false,
    port: MAIL.PORT,
    auth: {
      user: MAIL.USER,
      pass: MAIL.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: 'snippetmanager@resend.dev',
    to,
    subject,
    html: body,
  });
  return info;
};

export default sendEmail;
