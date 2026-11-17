
import { ForecastResponse } from "./open-meteo.types";
import { AppError } from "../../common/exceptions/app-error";

export class ForecastClient {
    private readonly baseUrl = "https://api.open-meteo.com/v1/forecast";

    async getForecast(
        latitude: number,
        longitude: number
    ): Promise<ForecastResponse> {
        const url = new URL(this.baseUrl);

        url.searchParams.set("latitude", String(latitude));
        url.searchParams.set("longitude", String(longitude));

        url.searchParams.set(
            "daily",
            [
                "temperature_2m_min",
                "temperature_2m_max",
                "precipitation_probability_max",
                "precipitation_sum",
                "snowfall_sum",
                "wind_speed_10m_max",
                "wind_gusts_10m_max",
                "cloud_cover_mean",
            ].join(",")
        );

        url.searchParams.set("forecast_days", "7");
        url.searchParams.set("timezone", "auto");
        url.searchParams.set("wind_speed_unit", "kmh");

        const response = await fetch(url);

        if (!response.ok) {
            throw new AppError(
                "Unable to fetch the weather forecast. Please try again later.",
                502,
                "FORECAST_API_ERROR"
            );
        }

        return (await response.json()) as ForecastResponse;
    }
}
