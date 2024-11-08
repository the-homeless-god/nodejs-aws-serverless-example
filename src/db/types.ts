import { DbgetOneSender, GetInvalidResponse, GetValidResponse } from "./get/types"

export type BodyItem<T> = Record<string, any> & T
export type StandardBody<T> = BodyItem<T>
export type ItemBody<T> = BodyItem<{ Item?: StandardBody<T> }>
export type ItemsBody<T> = BodyItem<{ Items?: StandardBody<T>[] }>

export type ChainableBody<T> = StandardBody<T> | ItemBody<T> | ItemsBody<T>
export type BodyItemChain = <T>(body: ChainableBody<T>) => BodyItem<T>

export type DbSender = DbgetOneSender

export type ValidResponse = GetValidResponse
export type InvalidResponse = GetInvalidResponse