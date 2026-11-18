
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { GraphQLError } from "graphql";
import { ZodError } from "zod";
import { AppError } from "../common/exceptions/app-error";
import { RecommendationsService } from "../modules/recommendations/recommendations.service";
import { createResolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schemas/schema";

export const createGraphQLMiddleware = async (
    recommendationsService: RecommendationsService
) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers: createResolvers(recommendationsService),
        includeStacktraceInErrorResponses: false,
        formatError: (formattedError, error) => {
            const originalError =
                error instanceof GraphQLError ? error.originalError : undefined;

            if (originalError instanceof ZodError) {
                return {
                    message: originalError.issues[0].message,
                    extensions: {
                        code: "BAD_USER_INPUT",
                    },
                };
            }

            if (originalError instanceof AppError) {
                return {
                    ...formattedError,
                    message: originalError.message,
                    extensions: {
                        ...formattedError.extensions,
                        code: originalError.code,
                        http: {
                            status: originalError.statusCode,
                        },
                    },
                };
            }

            return formattedError;
        },
    });

    await server.start();

    return expressMiddleware(server);
};
