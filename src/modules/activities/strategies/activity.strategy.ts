import { DailyWeather } from "../../weather/weather.interface";

export interface ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null;
}