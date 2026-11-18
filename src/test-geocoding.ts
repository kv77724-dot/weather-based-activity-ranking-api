// import { ForecastClient } from "./integrations/open-meteo/forecast.client";
// import { GeocodingClient } from "./integrations/open-meteo/geocoding.client";
// import { WeatherService } from "./modules/weather/weather.service";

// // async function main() {
// //   const client = new GeocodingClient();

// //   const locations = await client.search("Manali");

// //   console.log(JSON.stringify(locations, null, 2));
// // }

// // async function main() {
// //   const client = new ForecastClient();

// //   const forecast = await client.getForecast(
// //     32.161686,
// //     77.1584
// //   );

// //   console.log(JSON.stringify(forecast, null, 2));
// // }



// async function main() {
//   const weatherService = new WeatherService(
//     new GeocodingClient(),
//     new ForecastClient()
//   );

//   const weather = await weatherService.getWeather("Manali");

//   console.log(JSON.stringify(weather, null, 2));
// }

// main();

import { SurfingStrategy } from "./modules/activities/strategies/surfing.strategy";
import { DailyWeather } from "./modules/weather/weather.interface";
import { MarineClient } from "./integrations/open-meteo/marine.client";


// const strategy = new SurfingStrategy();
// // const strategy = new SkiingStrategy();

// const weather: DailyWeather = {
//   date: "2026-11-18",
//   temperature: {
//     min: -5,
//     max: 2,
//   },
//   precipitationProbability: 20,
//   precipitation: 2,
//   snowfall: 12,
//   windSpeed: 10,
//   windGusts: 18,
//   cloudCover: 25,
// };

// const score = strategy.calculateScore(weather);


async function main() {
  const marineClient = new MarineClient();

  try {
    const result = await marineClient.getMarineForecast(
      19.076,
      72.8777
    );

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Marine API test failed:", error);
  }
}

main()