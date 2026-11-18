
import { ActivityStrategy } from "./activity.strategy";
import { DailyWeather } from "../../weather/weather.interface";
import { activityScoringConfig } from "../configs/activity-scoring.config";

const surfingScoringConfig = activityScoringConfig.surfing;

export class SurfingStrategy implements ActivityStrategy {
    calculateScore(weather: DailyWeather): number | null {
        const scores = [
            { score: this.getWaveHeightScore(weather.waveHeight), weight: surfingScoringConfig.weights.waveHeight },
            { score: this.getWavePeriodScore(weather.wavePeriod), weight: surfingScoringConfig.weights.wavePeriod },
            { score: this.getSwellHeightScore(weather.swellHeight), weight: surfingScoringConfig.weights.swellHeight },
            { score: this.getSwellPeriodScore(weather.swellPeriod), weight: surfingScoringConfig.weights.swellPeriod },
            { score: this.getWindSpeedScore(weather.windSpeed), weight: surfingScoringConfig.weights.windSpeed },
            { score: this.getWindGustScore(weather.windGusts), weight: surfingScoringConfig.weights.windGusts },
            { score: this.getPrecipitationScore(weather.precipitation), weight: surfingScoringConfig.weights.precipitation },
            { score: this.getCloudCoverScore(weather.cloudCover), weight: surfingScoringConfig.weights.cloudCover },
        ];

        const availableScores = scores.filter(
            (item) => item.score !== null
        );

        if (availableScores.length === 0) return null;

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

    private getWaveHeightScore(value: number | null): number | null {
        if (value === null) return null;
        if (value < 0.3) return 20;
        if (value < 0.5) return 50;
        if (value <= 1.5) return 100;
        if (value <= 2.5) return 75;
        if (value <= 3.5) return 45;
        return 20;
    }

    private getWavePeriodScore(value: number | null): number | null {
        if (value === null) return null;
        if (value < 6) return 30;
        if (value < 8) return 70;
        if (value <= 12) return 100;
        if (value <= 14) return 85;
        return 70;
    }

    private getSwellHeightScore(value: number | null): number | null {
        if (value === null) return null;
        if (value < 0.3) return 20;
        if (value < 0.5) return 50;
        if (value <= 1.5) return 100;
        if (value <= 2.5) return 75;
        if (value <= 3.5) return 45;
        return 20;
    }

    private getSwellPeriodScore(value: number | null): number | null {
        if (value === null) return null;
        if (value < 6) return 30;
        if (value < 8) return 70;
        if (value <= 12) return 100;
        if (value <= 14) return 85;
        return 70;
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
