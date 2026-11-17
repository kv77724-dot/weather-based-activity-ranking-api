import { Request, Response, NextFunction } from "express";
import { AppError } from "../exceptions/app-error";
import { ApiResponse } from "../utils/api-response";

export function globalErrorHandler(
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction
): void {
    if (res.headersSent) {
        next(err);
        return;
    }

    if (err instanceof AppError) {
        res.status(err.statusCode).json(
            ApiResponse.error(err.message, err.code)
        );
        return;
    }

    res.status(500).json(
        ApiResponse.error(
            "Something went wrong. Please try again later.",
            "INTERNAL_SERVER_ERROR"
        )
    );
}
