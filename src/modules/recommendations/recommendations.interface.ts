export type ActivityType =
    | "skiing"
    | "surfing"
    | "outdoorSightseeing"
    | "indoorSightseeing";

export interface RankedDay {
    rank: number;
    date: string;
    score: number;
}

export interface ActivityRecommendations {
    skiing: RankedDay[];
    surfing: RankedDay[];
    outdoorSightseeing: RankedDay[];
    indoorSightseeing: RankedDay[];
}

export interface RecommendationsData {
    recommendations: ActivityRecommendations;
}