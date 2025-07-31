"use strict";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import { crearAdmin } from "./createAdminDefault.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import publicationRoutes from "../src/publication/publication.routes.js";
import commentRoutes from "../src/comments/comment.routes.js";
import categoryRoutes from "../src/category/category.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";

const app = express();

const middlewares = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(apiLimiter);
};

const routes = (app) => {
  // Documentación Swagger
  app.use("/nudge/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
    customSiteTitle: "Nudge API Documentation",
    customCss: '.swagger-ui .topbar { display: none }',
    customCssUrl: '/swagger-ui-theme.css'
  }));
  
  app.use("/nudge/v1/auth", authRoutes);
  app.use("/nudge/v1/users", userRoutes);
  app.use("/nudge/v1/categories", categoryRoutes);
  app.use("/nudge/v1/publications", publicationRoutes);
  app.use("/nudge/v1/comments", commentRoutes);
  
  app.get("/nudge/v1/health", (req, res) => {
    res.status(200).json({
      success: true,
      message: "Nudge API is running successfully",
      timestamp: new Date().toISOString(),
      documentation: "/nudge/v1/api-docs"
    });
  });
};

const conectarDB = async () => {
  try {
    await dbConnection();
  } catch (err) {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

export const initiServer = async () => {
  try {
    middlewares(app);
    await conectarDB();
    routes(app);
    await crearAdmin(); 

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(`Server init failed: ${err}`);
  }
};