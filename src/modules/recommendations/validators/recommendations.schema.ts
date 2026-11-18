import { z } from "zod";

export const recommendationsSchema = z.object({
    city: z
        .string()
        .trim()
        .min(2, "City name must contain at least 2 characters")
        .max(100, "City name must not exceed 100 characters"),
});