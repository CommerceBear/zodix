import { data } from 'react-router';
export declare function createErrorResponse(options?: {
    message?: string;
    status?: number;
}): ReturnType<typeof data<string>>;
