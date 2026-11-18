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

import { SkiingStrategy } from "./modules/activities/strategies/skiing.strategy";
import { SurfingStrategy } from "./modules/activities/strategies/surfing.strategy";
import { DailyWeather } from "./modules/weather/weather.interface";

const strategy = new SurfingStrategy();
// const strategy = new SkiingStrategy();

const weather: DailyWeather = {
  date: "2026-11-18",
  temperature: {
    min: -5,
    max: 2,
  },
  precipitationProbability: 20,
  precipitation: 2,
  snowfall: 12,
  windSpeed: 10,
  windGusts: 18,
  cloudCover: 25,
};

const score = strategy.calculateScore(weather);

console.log("skiing", score);