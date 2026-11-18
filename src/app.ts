import express from "express";
import { globalErrorHandler } from "./common/middleware/error-handler";
import { createGraphQLMiddleware } from "./graphql";
import { ForecastClient } from "./integrations/open-meteo/forecast.client";
import { GeocodingClient } from "./integrations/open-meteo/geocoding.client";
import { MarineClient } from "./integrations/open-meteo/marine.client";
import { RedisCacheService } from "./integrations/redis/redis-cache.service";
import { RecommendationsService } from "./modules/recommendations/recommendations.service";
import { WeatherService } from "./modules/weather/weather.service";

const app = express();

app.use(express.json());

const weatherService = new WeatherService(
    new GeocodingClient(),
    new ForecastClient(),
    new MarineClient()
);

const redisService = new RedisCacheService()

const recommendationsService = new RecommendationsService(
    weatherService,
    redisService
);

export const configureGraphQL = async () => {
    const graphqlMiddleware = await createGraphQLMiddleware(
        recommendationsService
    );

    app.use("/graphql", graphqlMiddleware);
};

app.use(globalErrorHandler);

export default app;