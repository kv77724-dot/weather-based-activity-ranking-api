
export interface GeocodingResult {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    country_code?: string;
    admin1?: string;
    timezone?: string;
    elevation?: number;
}

export interface GeocodingResponse {
    results?: GeocodingResult[];
    error?: boolean;
    reason?: string;
}

export interface ForecastResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    elevation: number;
    daily: {
        time: string[];
        temperature_2m_min: (number | null)[];
        temperature_2m_max: (number | null)[];
        precipitation_probability_max: (number | null)[];
        precipitation_sum: (number | null)[];
        snowfall_sum: (number | null)[];
        wind_speed_10m_max: (number | null)[];
        wind_gusts_10m_max: (number | null)[];
        cloud_cover_mean: (number | null)[];
    };
}
