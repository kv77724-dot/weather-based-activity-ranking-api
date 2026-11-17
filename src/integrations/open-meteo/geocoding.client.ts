
import { GeocodingResponse, GeocodingResult } from "./open-meteo.types";
import { AppError } from "../../common/exceptions/app-error";

export class GeocodingClient {
    private readonly baseUrl =
        "https://geocoding-api.open-meteo.com/v1/search";

    async search(city: string): Promise<GeocodingResult> {
        const url = new URL(this.baseUrl);

        url.searchParams.set("name", city);
        url.searchParams.set("count", "10");
        url.searchParams.set("language", "en");
        url.searchParams.set("format", "json");

        const response = await fetch(url);

        if (!response.ok) {
            throw new AppError(
                "Unable to look up the location. Please try again later.",
                502,
                "GEOCODING_API_ERROR"
            );
        }

        const data = (await response.json()) as GeocodingResponse;

        if (data.error) {
            throw new AppError(
                "Unable to look up the location. Please try again later.",
                502,
                "GEOCODING_API_ERROR"
            );
        }

        const location = data.results?.[0];

        if (!location) {
            throw new AppError(
                `Could not find a location named "${city}".`,
                404,
                "LOCATION_NOT_FOUND"
            );
        }

        return location;
    }
}
