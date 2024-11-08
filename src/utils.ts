import { InvalidResponse, ValidResponse } from "./db/types";
import { Response } from "./db/get/types";

export const getValidStatusCode = (): 200 => 200;
export const getInvalidStatusCode = (): 500 => 500;

export const getHeaders = () => {
    return {
        "Content-Type": "application/json",
    };
}

export const isPromiseLike = <T>(element: unknown): element is Promise<T> => {
    if (element !== null && typeof element === 'object') {
        if ('then' in element) return true
    }

    return false
}

export const enrichValidStatusCode: ValidResponse = (stringifiedData) => {
    return {
        body: stringifiedData,
        statusCode: getValidStatusCode()
    }
}

export const enrichInvalidStatusCode: InvalidResponse = (stringifiedError) => {
    return {
        body: stringifiedError,
        statusCode: getInvalidStatusCode()
    }
}

export const withStringified = <T>(data: T): string => JSON.stringify(data)