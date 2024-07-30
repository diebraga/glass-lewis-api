import swaggerJsdoc from "swagger-jsdoc";
import { components } from "./componentsSpec";
import { paths } from "./pathsSpec";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Glass Lewis",
    version: "1.0.0",
    description: "Glass Lewis api documentation",
  },
  servers: [
    {
      url: "https://glass-lewis-api-git-main-diebragas-projects.vercel.app",
    },
  ],
  components: components,
  paths: paths,
};

const options = {
  swaggerDefinition,
  apis: ["./pages/api/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
