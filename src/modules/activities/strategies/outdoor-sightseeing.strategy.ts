
import { ActivityStrategy } from "./activity.strategy";
import { DailyWeather } from "../../weather/weather.interface";

export class OutdoorSightseeingStrategy implements ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null {
        const scores = [
            { score: this.getTemperatureScore(weather.temperature.max), weight: 35 },
            { score: this.getPrecipitationScore(weather.precipitation), weight: 30 },
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

    private getTemperatureScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 5) return 30;
        if (value <= 10) return 55;
        if (value <= 18) return 85;
        if (value <= 25) return 100;
        if (value <= 30) return 80;
        if (value <= 35) return 50;
        return 20;
    }

    private getPrecipitationScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 0.5) return 100;
        if (value <= 2) return 80;
        if (value <= 5) return 60;
        if (value <= 10) return 30;
        return 10;
    }

    private getWindSpeedScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 10) return 100;
        if (value <= 20) return 80;
        if (value <= 30) return 50;
        if (value <= 40) return 25;
        return 10;
    }

    private getCloudCoverScore(value: number | null): number | null {
        if (value === null) return null;
        if (value <= 20) return 100;
        if (value <= 40) return 85;
        if (value <= 60) return 70;
        if (value <= 80) return 50;
        return 35;
    }
}
