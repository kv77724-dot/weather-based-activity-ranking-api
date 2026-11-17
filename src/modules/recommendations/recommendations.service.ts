
import { RecommendationsData } from "./recommendations.interface";

export class RecommendationsService {
    async getRecommendations(
        city: string
    ): Promise<RecommendationsData> {
        return {
            recommendations: {
                skiing: [
                    {
                        rank: 1,
                        date: "2026-11-17",
                        score: 78,
                    },
                    {
                        rank: 2,
                        date: "2026-11-18",
                        score: 72,
                    },
                ],
                surfing: [
                    {
                        rank: 1,
                        date: "2026-11-19",
                        score: 85,
                    },
                ],

                outdoorSightseeing: [
                    {
                        rank: 1,
                        date: "2026-11-20",
                        score: 91,
                    },
                ],

                indoorSightseeing: [
                    {
                        rank: 1,
                        date: "2026-11-21",
                        score: 88,
                    },
                ],
            }
        }
    }
}
