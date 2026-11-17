import { Request, Response } from "express";
import { RecommendationsService } from "./recommendations.service";
import { ApiResponse } from "../../common/utils/api-response";
import { recommendationsQuerySchema } from "./validators/recommendations.schema";

export class RecommendationsController {
    constructor(
        private readonly recommendationsService: RecommendationsService
    ) { }

    getRecommendations = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        const result = recommendationsQuerySchema.safeParse(req.query);

        if (!result.success) {
            res.status(400).json(
                ApiResponse.error(
                    result.error.issues[0].message,
                    "VALIDATION_ERROR"
                )
            );
            return;
        }
        const { city } = result.data;

        const recommendations =
            await this.recommendationsService.getRecommendations(city);

        res.status(200).json(
            ApiResponse.success(
                recommendations,
                "Recommendations retrieved successfully"
            )
        );
    };
}