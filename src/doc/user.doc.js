import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { HOST } from "../config/envs.js";

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API REST con Express y Swagger",
      version: "1.0.0",
      description: "Documentación de la API REST creada con Express y Swagger",
    },
  },
  // apis: ["src/routes/user.routes.js"], // Especifica el lugar donde se encuentran tus rutas o controladores
  apis: ["src/doc/user.doc.yml", "src/doc/product.doc.yml"], // Especifica el lugar donde se encuentran tus rutas o controladores
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const userSwaggerDoc = (app, port) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`${HOST}${port}/api/docs`);
  console.log(`${HOST}${port}/api/docs.json`);
};
