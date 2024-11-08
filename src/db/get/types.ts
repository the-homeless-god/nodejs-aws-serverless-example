import {
    DynamoDBDocumentClient,
    GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { BodyItemChain } from "../types";

export type Data = {
    name: string;
}

export type Response<StatusCode = 200 | 500> = {
    body?: string;
    statusCode: StatusCode
}

export type GetOne = (db: DynamoDBDocumentClient, tableName: string, id: string) => Promise<Response>;
export type PayloadCollection = Parameters<GetOne>
export type GetPayloadCreator = (tableName: string, id: string) => GetCommand
export type DbgetOneSender = (payload: ReturnType<GetPayloadCreator>) => ReturnType<GetOne>
export type SlicePayloadCollectionUntilCreator = (db: DynamoDBDocumentClient, tableName: string, id: string) => [tableName: string, id: string]

export type GetResponse<StatusCode> = (body: string) => Response<StatusCode>

export type GetValidResponse = GetResponse<200>
export type GetInvalidResponse = GetResponse<500>
export type FormattedBody = (data: Data) => string;
export type GetResponser = GetInvalidResponse | GetValidResponse

export type Functors = [SlicePayloadCollectionUntilCreator, GetPayloadCreator, DbgetOneSender, BodyItemChain, FormattedBody,  GetValidResponse]

export type GetReduce = (functors: Functors, onError: GetInvalidResponse) => Promise<Response>
export type GetReductor = (db: DynamoDBDocumentClient, tableName: string, id: string) => GetReduce