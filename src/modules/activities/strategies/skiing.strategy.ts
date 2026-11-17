import { DailyWeather } from "../../weather/weather.interface";
import { skiingScoringConfig } from "../configs/activity-scoring.config";
import { ActivityStrategy } from "./activity.strategy";

export class SkiingStrategy implements ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null {
        const scores = [
            {
                score: this.getSnowfallScore(weather.snowfall),
                weight: skiingScoringConfig.weights.snowfall,
            },
            {
                score: this.getWindSpeedScore(weather.windSpeed),
                weight: skiingScoringConfig.weights.windSpeed,
            },
            {
                score: this.getTemperatureScore(weather.temperature.max),
                weight: skiingScoringConfig.weights.temperature,
            },
            {
                score: this.getWindGustScore(weather.windGusts),
                weight: skiingScoringConfig.weights.windGusts,
            },
            {
                score: this.getCloudCoverScore(weather.cloudCover),
                weight: skiingScoringConfig.weights.cloudCover,
            },
        ];

        const availableScores = scores.filter(
            (item) => item.score !== null
        );

        if (availableScores.length === 0) {
            return null;
        }

        const totalWeightedScore = availableScores.reduce(
            (total, item) => total + item.score! * item.weight,
            0
        );

        const totalWeight = availableScores.reduce(
            (total, item) => total + item.weight,
            0
        );

        return Math.round(totalWeightedScore / totalWeight);
    }

    private getSnowfallScore(value: number | null): number | null {
        if (value === null) return null;
        if (value === 0) return 50;
        if (value <= 5) return 70;
        if (value <= 15) return 100;
        if (value <= 25) return 75;
        return 40;
    }

    private getWindSpeedScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 10) return 100;
        if (value <= 20) return 80;
        if (value <= 30) return 55;
        if (value <= 40) return 30;
        return 10;
    }

    private getTemperatureScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 0) return 100;
        if (value <= 3) return 85;
        if (value <= 6) return 65;
        if (value <= 10) return 40;
        return 15;
    }

    private getWindGustScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 20) return 100;
        if (value <= 30) return 80;
        if (value <= 40) return 55;
        if (value <= 50) return 30;
        return 10;
    }

    private getCloudCoverScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 20) return 100;
        if (value <= 40) return 85;
        if (value <= 60) return 65;
        if (value <= 80) return 45;
        return 25;
    }
}
