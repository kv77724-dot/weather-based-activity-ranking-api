import { ActivityStrategy } from "../activities/strategies/activity.strategy";
import { IndoorSightseeingStrategy } from "../activities/strategies/indoor-sightseeing.strategy";
import { OutdoorSightseeingStrategy } from "../activities/strategies/outdoor-sightseeing.strategy";
import { SkiingStrategy } from "../activities/strategies/skiing.strategy";
import { SurfingStrategy } from "../activities/strategies/surfing.strategy";
import { DailyWeather } from "../weather/weather.interface";
import { WeatherService } from "../weather/weather.service";
import { ActivityRecommendations, RankedDay } from "./recommendations.interface";

export class RecommendationsService {
    private readonly skiingStrategy = new SkiingStrategy();
    private readonly surfingStrategy = new SurfingStrategy();
    private readonly outdoorStrategy = new OutdoorSightseeingStrategy();
    private readonly indoorStrategy = new IndoorSightseeingStrategy();

    constructor(
        private readonly weatherService: WeatherService
    ) { }

    async getRecommendations(
        city: string
    ): Promise<ActivityRecommendations> {
        const weather = await this.weatherService.getWeather(city);

        return {
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