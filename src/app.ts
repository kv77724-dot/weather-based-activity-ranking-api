import express from "express";
import recommendationsRoutes from "./modules/recommendations/recommendations.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/recommendations", recommendationsRoutes);

export default app;