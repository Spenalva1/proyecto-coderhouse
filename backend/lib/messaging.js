import twilio from 'twilio';
import config from '../config/config.js';
import logger from './logger.js';

const client = twilio(config.TWILIO_SID, config.TWILIO_TOKEN);

export async function sendSms(to, body) {
  try {
    await client.messages.create({
      body,
      from: config.TWILIO_NUMBER,
      to,
    });
  } catch (error) {
    logger.error(`Error al enviar sms al comprador. ${error}.`);
  }
}

export async function sendWhatsapp(body, to = config.ADMIN_PHONE) {
  try {
    await client.messages.create({
      body,
      from: `whatsapp:${config.TWILIO_WHATSAPP}`,
      to: `whatsapp:${to}`,
    });
  } catch (error) {
    logger.error(`Error al enviar whatsapp al administrador. ${error}.`);
  }
}
