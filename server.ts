import { Express } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const swagger = (app: Express) => {
  if (process.env.NODE_ENV === "development") {
    const swaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Web class 01 - Ofri & Kfir REST API",
          version: "1.0.0",
          description: "Ofri & Kfir REST server with jwt authentication",
        },
        servers: [{ url: `http://localhost:${process.env.PORT}` }],
      },
      apis: ["./routes/*.ts"],
    };
    const specs = swaggerJsDoc(swaggerOptions);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }
};
export default swagger;
