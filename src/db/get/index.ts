import {
    GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { Data, GetOne, GetPayloadCreator, GetReductor, SlicePayloadCollectionUntilCreator } from "./types";
import { chainBodyItem } from '../utils'
import { enrichInvalidStatusCode, enrichValidStatusCode, withStringified } from "../../utils";

const createGetPayload: GetPayloadCreator = (tableName, id) => {
    return new GetCommand({
        TableName: tableName,
        Key: {
            id,
        },
    })
}

const slicePayload: SlicePayloadCollectionUntilCreator = (_db, ...payload) => [...payload]

const reduceGet: GetReductor = (...payload) => (functors, onError) => {
    const sliced = functors[0](...payload);
    const createdPayload = functors[1](...sliced);
    const dbPromised = functors[2](createdPayload);

    return dbPromised.then(dbUnpromised => {
        const chained = functors[3]<Data>(dbUnpromised)
        const stringified = functors[4](chained)

        const response = functors[5](stringified);

        return response
    }).catch((error: Error) => {
        return onError(error.message)
    })
}

export const onGetOne: GetOne = (db, tableName, id) =>
    reduceGet(db, tableName, id)([
        slicePayload, createGetPayload, db.send, chainBodyItem, withStringified, enrichValidStatusCode
    ],
        enrichInvalidStatusCode
    )


