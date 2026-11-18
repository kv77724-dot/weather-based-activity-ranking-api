import { RedisCacheService } from "../../integrations/redis/redis-cache.service";
import { ActivityStrategy } from "../activities/strategies/activity.strategy";
import { IndoorSightseeingStrategy } from "../activities/strategies/indoor-sightseeing.strategy";
import { OutdoorSightseeingStrategy } from "../activities/strategies/outdoor-sightseeing.strategy";
import { SkiingStrategy } from "../activities/strategies/skiing.strategy";
import { SurfingStrategy } from "../activities/strategies/surfing.strategy";
import { DailyWeather } from "../weather/weather.interface";
import { WeatherService } from "../weather/weather.service";
import { RecommendationsCache } from "./recommendations-cache.interface";
import { ActivityRecommendations, RankedDay } from "./recommendations.interface";
import { recommendationsSchema } from "./validators/recommendations.schema";

const CACHE_TTL = 30 * 60;

export class RecommendationsService {
    private readonly skiingStrategy = new SkiingStrategy();
    private readonly surfingStrategy = new SurfingStrategy();
    private readonly outdoorStrategy = new OutdoorSightseeingStrategy();
    private readonly indoorStrategy = new IndoorSightseeingStrategy();

    constructor(
        private readonly weatherService: WeatherService,
        private readonly redisCacheService: RedisCacheService
    ) { }

    async getRecommendations(
        city: string
    ): Promise<ActivityRecommendations> {
        const validatedInput = recommendationsSchema.parse({ city });

        const location = await this.weatherService.getGeoLocationFromCity(validatedInput.city);

        const cacheKey =
            `recommendations:${location.latitude.toFixed(5)}:${location.longitude.toFixed(5)}`;

        try {
            const cachedData =
                await this.redisCacheService.get<RecommendationsCache>(cacheKey);

            if (cachedData) {
                console.log("Recommendations cache hit:", cacheKey);
                return cachedData.recommendations;
            }
        } catch (error) {
            console.error("Redis cache read failed:", error);
        }

        console.log("Recommendations cache miss:", cacheKey);

        const weather = await this.weatherService.getWeatherByCoordinates(location);

        const recommendations: ActivityRecommendations = {
            skiing: this.rankDays(weather.days, this.skiingStrategy),
            surfing: this.rankDays(weather.days, this.surfingStrategy),
            outdoorSightseeing: this.rankDays(
                weather.days,
                this.outdoorStrategy
            ),
            indoorSightseeing: this.rankDays(
                weather.days,
                this.indoorStrategy
            ),
        }

        const cacheData: RecommendationsCache = {
            weather,
            recommendations,
            cachedAt: new Date().toISOString(),
        };

        try {
            await this.redisCacheService.set(
                cacheKey,
                cacheData,
                CACHE_TTL
            );

            console.log("Recommendations cached:", cacheKey);
        } catch (error) {
            console.error("Redis cache write failed:", error);
        }

        return recommendations
    }

    private rankDays(
        days: DailyWeather[],
        strategy: ActivityStrategy
    ): RankedDay[] {
        return days
            .flatMap((day) => {
                const score = strategy.calculateScore(day);

                if (score === null) return [];

                return [{ date: day.date, score }];
            })
            .sort((a, b) => b.score - a.score)
            .map((day, index) => ({
                rank: index + 1,
                date: day.date,
                score: day.score,
            }));
    }
}