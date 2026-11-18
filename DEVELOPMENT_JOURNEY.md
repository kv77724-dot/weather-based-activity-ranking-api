# How I Worked – Weather-Based Activity Ranking API

## 1. Understanding the problem

I started by researching how weather conditions affect different activities. I used Google, online articles, Open-Meteo documentation, and ChatGPT to identify relevant weather parameters and check whether the APIs provided numerical data that could be used for scoring.

I decided to use daily forecasts for the initial implementation. Hourly forecasts could provide more accurate activity windows, but I kept them as a potential future improvement.

## 2. API and architecture decisions

I identified three APIs:

- **Geocoding API:** Convert city names into geographical coordinates.
- **Forecast API:** Retrieve general weather conditions.
- **Marine API:** Retrieve wave and swell data required for surfing recommendations.

Since each activity requires different scoring logic and parameters, I chose the Strategy Design Pattern. Each activity has its own strategy and scoring formula.

I used AI tools to explore possible scoring formulas and initially implemented weighted scoring with activity-specific parameters and heuristic thresholds.

## 3. Implementation journey

I initially started with REST because I was more familiar with it.

I followed an incremental development approach, building and manually verifying individual components before moving to the next:

- Integrated and verified external APIs.
- Added weather aggregation, routes, controllers, services, validation, and common error handling.
- Implemented skiing, surfing, outdoor sightseeing, and indoor sightseeing strategies progressively.
- Moved common scoring weights into configuration.
- Migrated to GraphQL once the REST implementation was working.
- Added Redis caching using latitude and longitude rounded to five decimal places, with a one-hour TTL.

## 4. What I would improve

While testing, I realized that weighted scoring alone might not be sufficient. For example, skiing without sufficient snowfall should not receive a positive recommendation.

Some improvements I considered:

- Introduce mandatory activity conditions and risk assessment separately from scoring.
- Make activity rules configurable, potentially through database-driven configurations.
- Validate scoring formulas and thresholds with domain experts.
- Use hourly forecasts to identify the best activity windows.
- Consider historical weather and operational hours.
- Verify whether a location actually supports an activity, such as beaches for surfing or ski facilities for skiing.
- Allow users to select the correct location instead of automatically selecting the first geocoding result.

I did not implement all these improvements because of time constraints.

## 5. Questions I explored

- Which weather factors determine the suitability of each activity?
- Can these factors be represented numerically?
- Do the available APIs provide the required data directly?
- How do weather parameters relate to each other?
- How should safety and risk affect recommendations?
- How frequently do forecasts change, and does historical weather matter?
- Can hourly forecasts identify safer and more suitable time windows?
- Should location facilities and operational hours influence recommendations?

## Closing note

The project evolved through research, experimentation, implementation, and testing.
Not every decision was planned upfront. 
I refined the architecture as I understood the problem better, and the final implementation reflects both the decisions I made and the improvements I identified along the way.
