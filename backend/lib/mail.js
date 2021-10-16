import nodemailer from 'nodemailer';
import logger from './logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_ETH_HOST,
  port: process.env.MAIL_ETH_PORT,
  auth: {
    user: process.env.MAIL_ETH_USER,
    pass: process.env.MAIL_ETH_PASS,
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

export async function sendEmail(text, subject, to = process.env.ADMIN_EMAIL) {
  try {
    await transporter.sendMail({
      to,
      from: process.env.MAIL_ETH_USER,
      subject,
      html: formatedEmail(text),
    });
  } catch (error) {
    logger.error(`Error al enviar mail de asunto ${subject} a ${to}: ${error}`);
  }
}
