
import { ActivityStrategy } from "./activity.strategy";
import { DailyWeather } from "../../weather/weather.interface";

export class IndoorSightseeingStrategy implements ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null {
        const scores = [
            { score: this.getPrecipitationScore(weather.precipitation), weight: 40 },
            { score: this.getTemperatureScore(weather.temperature.max), weight: 25 },
            { score: this.getWindSpeedScore(weather.windSpeed), weight: 20 },
            { score: this.getCloudCoverScore(weather.cloudCover), weight: 15 },
        ];

        const available = scores.filter((item) => item.score !== null);

        if (available.length === 0) return null;

        const weightedTotal = available.reduce(
            (total, item) => total + item.score! * item.weight,
            0
        );

        const totalWeight = available.reduce(
            (total, item) => total + item.weight,
            0
        );

        return Math.round(weightedTotal / totalWeight);
    }

    private getPrecipitationScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 0.5) return 20;
        if (value <= 2) return 40;
        if (value <= 5) return 65;
        if (value <= 10) return 85;
        return 100;
    }

    private getTemperatureScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 5) return 90;
        if (value <= 10) return 75;
        if (value <= 18) return 35;
        if (value <= 25) return 20;
        if (value <= 30) return 55;
        if (value <= 35) return 85;
        return 100;
    }

    private getWindSpeedScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 10) return 20;
        if (value <= 20) return 40;
        if (value <= 30) return 65;
        if (value <= 40) return 85;
        return 100;
    }

    private getCloudCoverScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 20) return 20;
        if (value <= 40) return 35;
        if (value <= 60) return 50;
        if (value <= 80) return 65;
        return 75;
    }
}
