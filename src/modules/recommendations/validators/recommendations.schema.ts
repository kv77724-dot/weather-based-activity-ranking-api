import { z } from "zod";

export const recommendationsQuerySchema = z.object({
    city: z
        .string({
            required_error: "Please enter a city name.",
        })
        .trim()
        .min(1, "Please enter a city name."),
});