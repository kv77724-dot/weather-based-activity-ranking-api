import app, { configureGraphQL } from "./app";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    await configureGraphQL();

    app.listen(PORT, () => {
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
}

bootstrap();
