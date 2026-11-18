import { redisClient } from "./redis.client";

export class RedisCacheService {
    async get<T>(key: string): Promise<T | null> {
        const cachedData = await redisClient.get(key);

        if (!cachedData) {
            return null;
        }

        return JSON.parse(cachedData) as T;
    }

    async set<T>(
        key: string,
        value: T,
        ttlSeconds: number
    ): Promise<void> {
        await redisClient.set(
            key,
            JSON.stringify(value),
            {
                EX: ttlSeconds,
            }
        );
    }

    async delete(key: string): Promise<void> {
        await redisClient.del(key);
    }
}