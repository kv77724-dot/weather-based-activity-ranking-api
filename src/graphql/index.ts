
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { RecommendationsService } from "../modules/recommendations/recommendations.service";
import { createResolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schemas/schema";

export const createGraphQLMiddleware = async (
    recommendationsService: RecommendationsService
) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers: createResolvers(recommendationsService),
    });

    await server.start();

    return expressMiddleware(server);
};
