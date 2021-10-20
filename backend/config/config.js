import 'dotenv/config';

const config = {
  ADMIN: process.env.ADMIN,
  PORT: process.env.PORT || 8080,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce',
  JWT_SECRET: process.env.JWT_SECRET || 'secreto123321',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
  MAIL_ETH_HOST: process.env.MAIL_ETH_HOST,
  MAIL_ETH_PORT: process.env.MAIL_ETH_PORT,
  MAIL_ETH_USER: process.env.MAIL_ETH_USER,
  MAIL_ETH_PASS: process.env.MAIL_ETH_PASS,
  TWILIO_SID: process.env.TWILIO_SID,
  TWILIO_TOKEN: process.env.TWILIO_TOKEN,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,
};

export default config;
