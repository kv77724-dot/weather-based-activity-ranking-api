import { Router } from "express";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

const router = Router();

const recommendationsService = new RecommendationsService();

const recommendationsController = new RecommendationsController(
    recommendationsService
);

router.get("/", recommendationsController.getRecommendations);

export default router;