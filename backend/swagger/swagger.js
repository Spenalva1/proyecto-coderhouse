import swaggerJSDoc from 'swagger-jsdoc';

const swaggerConfig = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Coderhouse proyecto final API',
      version: '1.0.0',
      description: 'Ecommerce desarrollado por Santiago Nicolás Penalva',
    },
    servers: [
      {
        url: 'https://spenalva-coderhouse.herokuapp.com/',
      },
      {
        url: 'http://localhost:8080',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

export default swaggerJSDoc(swaggerConfig);
