
import { MarineResponse } from "./open-meteo.types";
import { AppError } from "../../common/exceptions/app-error";

export class MarineClient {
    private readonly baseUrl =
        "https://marine-api.open-meteo.com/v1/marine";

    async getMarineForecast(
        latitude: number,
        longitude: number
    ): Promise<MarineResponse> {
        const params = new URLSearchParams({
            latitude: String(latitude),
            longitude: String(longitude),
            daily: [
                "wave_height_max",
                "wave_period_max",
                "swell_wave_height_max",
                "swell_wave_period_max",
            ].join(","),
            forecast_days: "7",
            timezone: "auto",
            cell_selection: "sea",
        });

        try {
            const response = await fetch(
                `${this.baseUrl}?${params.toString()}`
            );

            const data = (await response.json()) as MarineResponse;

            if (!response.ok || data.error) {
                throw new AppError(
                    "Unable to retrieve marine forecast.",
                    502,
                    "MARINE_API_ERROR"
                );
            }

            return data;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                "Marine forecast service is unavailable.",
                502,
                "MARINE_API_ERROR"
            );
        }
    }
}
