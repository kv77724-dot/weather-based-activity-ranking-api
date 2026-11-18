# Weather-Based Activity Ranking API

A GraphQL API that ranks the best days for outdoor and indoor activities based on a city's seven-day weather forecast.

The API combines weather data from Open-Meteo with activity-specific scoring strategies to provide independent recommendations for skiing, surfing, outdoor sightseeing, and indoor sightseeing.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express 5
- **API:** GraphQL with Apollo Server
- **Validation:** Zod
- **Caching:** Redis
- **Weather Data:** Open-Meteo Geocoding, Forecast, and Marine APIs

## Architecture

The application follows a modular structure that separates API handling, business logic, external integrations, and activity scoring.

```text
src/
├── common/
│   ├── exceptions/
│   └── middleware/
├── config/
├── integrations/
│   ├── open-meteo/
│   └── redis/
├── modules/
│   ├── recommendations/
│   ├── weather/
│   └── activities/
│       ├── configs/
│       └── strategies/
├── graphql/
│   ├── schemas/
│   ├── resolvers.ts
│   └── index.ts
├── app.ts
└── server.ts
```

### Recommendation Flow

1. The client sends a city name through the GraphQL API.
2. The application validates the input and resolves the city using the Open-Meteo Geocoding API.
3. It generates a coordinate-based Redis cache key and checks for cached recommendations.
4. On a cache miss, forecast and marine data are fetched concurrently.
5. Each activity strategy calculates scores independently using its relevant weather factors.
6. Days are ranked by score and returned through GraphQL.

## Getting Started

### Prerequisites

- Node.js
- Redis

### Clone the Repository

```bash
git clone https://github.com/kv77724-dot/weather-based-activity-ranking-api
cd weather-based-activity-ranking-api
```

### Install Dependencies

```bash
npm install
```

### Environment Configuration

Create a `.env` file in the project root:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
CACHE_TTL_SECONDS=3600
```

### Start Redis

Make sure Redis is running locally.

Verify the connection:

```bash
redis-cli ping
```

Expected response:

```text
PONG
```

### Run the Application

```bash
npm run dev
```

The GraphQL API will be available at:

```text
http://localhost:3000/graphql
```

## GraphQL API

### Query

The `recommendations` query accepts a city name and returns ranked days for all four activities.

```graphql
query {
  recommendations(city: "Mumbai") {
    skiing {
      rank
      date
      score
    }
    surfing {
      rank
      date
      score
    }
    outdoorSightseeing {
      rank
      date
      score
    }
    indoorSightseeing {
      rank
      date
      score
    }
  }
}
```

### Response Structure

Each activity returns an independently ranked list of days.

```json
{
  "data": {
    "recommendations": {
      "skiing": [
        {
          "rank": 1,
          "date": "2026-11-19",
          "score": 85
        }
      ],
      "surfing": [],
      "outdoorSightseeing": [],
      "indoorSightseeing": []
    }
  }
}
```

*The response above illustrates the structure; actual results depend on the selected location and available forecast data.*

## Activity Scoring

Each activity has its own scoring strategy because different weather conditions affect activities differently.

| Activity | Weather factors considered |
|---|---|
| Skiing | Snowfall, temperature, wind speed, wind gusts, cloud cover |
| Surfing | Wave height, wave period, swell height, swell period, wind, precipitation, cloud cover |
| Outdoor sightseeing | Temperature, precipitation, wind, cloud cover |
| Indoor sightseeing | Precipitation, temperature, wind, cloud cover |

### Scoring Approach

- Each weather factor has an activity-specific weight.
- Weather measurements are evaluated against configurable heuristic thresholds.
- Scores are normalized based on the available weather measurements.
- Missing measurements are skipped rather than treated as zero.
- Days without sufficient weather data for scoring are excluded.
- Each activity is ranked independently, with the highest score receiving rank 1.

The current scoring formulas are heuristic estimates of relative weather suitability, not validated safety standards.

## Caching Strategy

Redis is used to reduce repeated calls to external weather APIs and avoid recalculating recommendations unnecessarily.

- **Cache key:** Generated using the location's latitude and longitude, rounded to five decimal places.
- **Cache duration:** One hour, configurable through `CACHE_TTL_SECONDS`.
- **Cached data:** Combined weather data and calculated recommendations.
- **Geocoding:** Performed on every request; geocoding results are not cached.
- **Cache hit:** Returns previously calculated recommendations.
- **Cache miss:** Fetches forecast and marine data, calculates recommendations, and stores the complete result.
- **Redis unavailable:** The application continues by fetching weather data and calculating recommendations without caching.
- **External API failure:** Incomplete weather data is not cached, and the request fails.

## Assumptions and Future Improvements

1. **Location suitability:** Verify whether a location supports the requested activity, such as beaches for surfing or ski resorts for skiing.

2. **Mandatory conditions:** Define activity-specific requirements, such as minimum snowfall for skiing, separately from weighted scoring.

3. **Scoring and safety:** Current scores use heuristic thresholds. Accurate formulas, thresholds, and safety rules should be validated by domain experts and activity specialists.

4. **Time-based recommendations:** Use hourly forecasts to identify suitable activity windows, considering weather conditions, safety, and operational hours.