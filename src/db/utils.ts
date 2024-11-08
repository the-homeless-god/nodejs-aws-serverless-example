import { BodyItemChain, ChainableBody } from "./types";

export const chainBodyItem: BodyItemChain = <T>(body: ChainableBody<T>) => {
    if (body['item']) {
        return body.Item
    }

    if (body['items']) {
        return body.Items
    }

    return body
}

