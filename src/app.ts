import express from "express";
import recommendationsRoutes from "./modules/recommendations/recommendations.routes";
import { globalErrorHandler } from "./common/middleware/error-handler";

const app = express();

app.use(express.json());

app.use("/api/v1/recommendations", recommendationsRoutes);

app.use(globalErrorHandler);

export default app;
