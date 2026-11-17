import { Router } from "express";
import { ForecastClient } from "../../integrations/open-meteo/forecast.client";
import { GeocodingClient } from "../../integrations/open-meteo/geocoding.client";
import { WeatherService } from "../weather/weather.service";
import { RecommendationsController } from "./recommendations.controller";
import { RecommendationsService } from "./recommendations.service";

const router = Router();

const weatherService = new WeatherService(new GeocodingClient(), new ForecastClient())
const recommendationsService = new RecommendationsService(weatherService);

const recommendationsController = new RecommendationsController(
    recommendationsService
);

router.get("/", recommendationsController.getRecommendations);

export default router;