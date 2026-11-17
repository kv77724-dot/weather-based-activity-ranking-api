export interface Location {
    city: string;
    country: string | null;
    latitude: number;
    longitude: number;
    timezone: string;
}

export interface DailyWeather {
    date: string;
    temperature: {
        min: number | null;
        max: number | null;
    };
    precipitationProbability: number | null;
    precipitation: number | null;
    snowfall: number | null;
    windSpeed: number | null;
    windGusts: number | null;
    cloudCover: number | null;
}

export interface WeatherData {
    location: Location;
    days: DailyWeather[];
}