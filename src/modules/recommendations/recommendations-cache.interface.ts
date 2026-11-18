import { WeatherData } from "../weather/weather.interface";
import { ActivityRecommendations } from "./recommendations.interface";

export interface RecommendationsCache {
    weather: WeatherData;
    recommendations: ActivityRecommendations;
    cachedAt: string;
}