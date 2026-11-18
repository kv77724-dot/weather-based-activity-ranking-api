
export const activityScoringConfig = {
    skiing: {
        weights: {
            snowfall: 30,
            windSpeed: 25,
            temperature: 20,
            windGusts: 15,
            cloudCover: 10,
        },
    },
    surfing: {
        weights: {
            waveHeight: 25,
            wavePeriod: 15,
            swellHeight: 15,
            swellPeriod: 10,
            windSpeed: 15,
            windGusts: 10,
            precipitation: 5,
            cloudCover: 5,
        },
    },
    outdoorSightseeing: {
        weights: {
            temperature: 35,
            precipitation: 30,
            windSpeed: 20,
            cloudCover: 15,
        },
    },
    indoorSightseeing: {
        weights: {
            precipitation: 40,
            temperature: 25,
            windSpeed: 20,
            cloudCover: 15,
        },
    },
} as const;
