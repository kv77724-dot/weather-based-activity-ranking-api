import {
    ApiSuccessResponse,
    ApiErrorResponse,
} from "../interfaces/api-response.interface";

export class ApiResponse {
    static success<T>(
        data: T,
        message = "Request successful"
    ): ApiSuccessResponse<T> {
        return {
            success: true,
            message,
            data,
        };
    }

    static error(
        message: string,
        code: string,
        details?: unknown
    ): ApiErrorResponse {
        return {
            success: false,
            message,
            error: {
                code,
                ...(details !== undefined && { details }),
            },
        };
    }
}