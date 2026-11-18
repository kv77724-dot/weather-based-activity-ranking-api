import { RecommendationsService } from "../../modules/recommendations/recommendations.service";

export const createResolvers = (
    recommendationsService: RecommendationsService
) => ({
    Query: {
        recommendations: async (
            _: unknown,
            args: { city: string }
        ) => {
            return recommendationsService.getRecommendations(args.city);
        },
    },
});