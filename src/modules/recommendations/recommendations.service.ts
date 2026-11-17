import { WeatherService } from "../weather/weather.service";
import { RecommendationsData } from "./recommendations.interface";

export class RecommendationsService {
    constructor(
        private readonly weatherService: WeatherService
    ) { }

    async getRecommendations(
        city: string
    ): Promise<RecommendationsData> {
        const weather = await this.weatherService.getWeather(city);

        console.log('Waather', weather);

        return {
            recommendations: {
                skiing: [],
                surfing: [],
                outdoorSightseeing: [],
                indoorSightseeing: [],
            }
        }
    }
}