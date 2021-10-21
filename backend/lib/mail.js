import nodemailer from 'nodemailer';
import config from '../config/config.js';
import logger from './logger.js';

const transporter = nodemailer.createTransport({
  host: config.MAIL_ETH_HOST,
  port: config.MAIL_ETH_PORT,
  auth: {
    user: config.MAIL_ETH_USER,
    pass: config.MAIL_ETH_PASS,
  },
});

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.MAIL_GMAIL_USER,
    pass: config.MAIL_GMAIL_PASS,
  },
});

export const signupInfo = (obj) => `
  <h3>Nuevo registro!</h3>
  <ul>
    ${Object.entries(obj)
      .map(([key, value]) => `<li>${key}: ${value}</li>`)
      .join('')}
  </ul>
`;

export const checkoutInfo = (name, email, products) => `
  <h3>Nueva compra de ${name}!</h3>
  <p>Email del usuario: ${email}</p>
  <p>El usuario compró:</p>
  <ul>
    ${products.map((product) => `<li>${product}</li>`).join('')}
  </ul>
`;

const formatedEmail = (html) => `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Buenas!</h2>
    ${html}
    <p>Coderhouse</p>
  </div>
`;

export async function sendEmail(text, subject, to = config.ADMIN_EMAIL) {
  try {
    const mailConfig = {
      to,
      from: config.MAIL_ETH_USER,
      subject,
      html: formatedEmail(text),
    };
    await Promise.all([
      transporter.sendMail(mailConfig),
      gmailTransporter.sendMail(mailConfig),
    ]);
  } catch (error) {
    console.error(error);
    logger.error(`Error al enviar mail de asunto ${subject} a ${to}: ${error}`);
  }
}
