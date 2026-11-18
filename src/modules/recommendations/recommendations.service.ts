import { SkiingStrategy } from "../activities/strategies/skiing.strategy";
import { WeatherService } from "../weather/weather.service";
import { RecommendationsData } from "./recommendations.interface";

export class RecommendationsService {
    private readonly skiingStrategy = new SkiingStrategy();

    constructor(
        private readonly weatherService: WeatherService
    ) { }

    async getRecommendations(
        city: string
    ): Promise<RecommendationsData> {
        const weather = await this.weatherService.getWeather(city);

        const skiing = weather.days
            .map((day) => ({
                date: day.date,
                score: this.skiingStrategy.calculateScore(day),
            }))
            .filter(
                (day): day is { date: string; score: number } =>
                    day.score !== null
            )
            .sort((a, b) => b.score - a.score)
            .map((day, index) => ({
                rank: index + 1,
                date: day.date,
                score: day.score,
            }));

        console.log('marine data', weather.days);
        return {
            recommendations: {
                skiing,
                surfing: [],
                outdoorSightseeing: [],
                indoorSightseeing: [],
            }
        }
    }
}