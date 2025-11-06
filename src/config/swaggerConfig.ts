import swaggerJsdoc, { SwaggerDefinition } from "swagger-jsdoc";
import config from ".";
import { version } from "../../package.json";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.1.0",
  info: {
    title: "Lujay Autos",
    version: version,
    description: "OpenApi documentaiton for Lujays Autos backend API",
  },
  servers: [
    {
      url: `http://localhost:${config.port}/`,
      description: "Local server",
    },
    {
      url: "https://lujays-autos-production.up.railway.app/",
      description: "Live server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "A list of routes for Authentication",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  externalDocs: {
    url: config.SWAGGER_JSON_URL,
  },
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
    "./src/services/*.ts",
    "./src/schema/*.ts",
    "./src/docs/*.ts",
  ],
};

const specs = swaggerJsdoc(options);

export default specs;
