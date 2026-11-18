import app, { configureGraphQL } from "./app";
import { connectRedis } from "./integrations/redis/redis.client";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {
        await connectRedis();
    } catch (error) {
        console.error('Error occured while starting redis')
    }

    await configureGraphQL();

    app.listen(PORT, () => {
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
}

bootstrap();
