import { ForecastClient } from "../../integrations/open-meteo/forecast.client";
import { GeocodingClient } from "../../integrations/open-meteo/geocoding.client";
import { MarineClient } from "../../integrations/open-meteo/marine.client";
import { WeatherData } from "./weather.interface";

export class WeatherService {
    constructor(
        private readonly geocodingClient: GeocodingClient,
        private readonly forecastClient: ForecastClient,
        private readonly marineClient: MarineClient
    ) { }

    async getWeather(city: string): Promise<WeatherData> {
        const location = await this.geocodingClient.search(city);

        const [forecast, marine] = await Promise.all([
            this.forecastClient.getForecast(
                location.latitude,
                location.longitude
            ),
            this.marineClient.getMarineForecast(
                location.latitude,
                location.longitude
            ),
        ]);

        const marineByDate = new Map(
            marine.daily.time.map((date, index) => [
                date,
                {
                    waveHeight: marine.daily.wave_height_max[index] ?? null,
                    wavePeriod: marine.daily.wave_period_max[index] ?? null,
                    swellHeight: marine.daily.swell_wave_height_max[index] ?? null,
                    swellPeriod: marine.daily.swell_wave_period_max[index] ?? null,
                },
            ])
        );

        const days = forecast.daily.time.map((date, index) => {
            const marineData = marineByDate.get(date);

            return {
                date,
                temperature: {
                    min: forecast.daily.temperature_2m_min[index] ?? null,
                    max: forecast.daily.temperature_2m_max[index] ?? null,
                },
                precipitationProbability:
                    forecast.daily.precipitation_probability_max[index] ?? null,
                precipitation:
                    forecast.daily.precipitation_sum[index] ?? null,
                snowfall:
                    forecast.daily.snowfall_sum[index] ?? null,
                windSpeed:
                    forecast.daily.wind_speed_10m_max[index] ?? null,
                windGusts:
                    forecast.daily.wind_gusts_10m_max[index] ?? null,
                cloudCover:
                    forecast.daily.cloud_cover_mean[index] ?? null,
                waveHeight: marineData?.waveHeight ?? null,
                wavePeriod: marineData?.wavePeriod ?? null,
                swellHeight: marineData?.swellHeight ?? null,
                swellPeriod: marineData?.swellPeriod ?? null,
            }
        })

        return {
            location: {
                city: location.name,
                country: location.country ?? null,
                latitude: location.latitude,
                longitude: location.longitude,
                timezone: forecast.timezone,
            },
            days,
        };
    }
}
