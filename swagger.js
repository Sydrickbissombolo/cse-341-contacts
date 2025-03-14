const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Contacts Api",
    description: "Api to manage contacts",
  },
    host: "localhost:5000",
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);