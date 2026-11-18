
import { ActivityStrategy } from "./activity.strategy";
import { DailyWeather } from "../../weather/weather.interface";

export class SurfingStrategy implements ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null {
        const scores = [
            {
                score: this.getWindSpeedScore(weather.windSpeed),
                weight: 35,
            },
            {
                score: this.getWindGustScore(weather.windGusts),
                weight: 30,
            },
            {
                score: this.getPrecipitationScore(weather.precipitation),
                weight: 25,
            },
            {
                score: this.getCloudCoverScore(weather.cloudCover),
                weight: 10,
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

    private getWindSpeedScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 10) return 100;
        if (value <= 20) return 80;
        if (value <= 30) return 55;
        if (value <= 40) return 30;
        return 10;
    }

    private getWindGustScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 20) return 100;
        if (value <= 30) return 80;
        if (value <= 40) return 55;
        if (value <= 50) return 30;
        return 10;
    }

    private getPrecipitationScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 1) return 100;
        if (value <= 5) return 80;
        if (value <= 10) return 60;
        if (value <= 20) return 30;
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
