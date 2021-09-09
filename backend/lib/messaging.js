import twilio from 'twilio';
import logger from './logger.js';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function sendSms(to, body) {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_NUMBER,
      to,
    });
  } catch (error) {
    logger.error(`Error al enviar sms al comprador. ${error}.`);
  }
}

export async function sendWhatsapp(body, to = process.env.ADMIN_PHONE) {
  try {
    await client.messages.create({
      body,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP}`,
      to: `whatsapp:${to}`,
    });
  } catch (error) {
    logger.error(`Error al enviar whatsapp al administrador. ${error}.`);
  }
}
