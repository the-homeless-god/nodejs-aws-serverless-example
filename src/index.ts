import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { onGetOne } from "./db/get";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const tableName = "my-awesome-data";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event, _context) => {
  switch (event.routeKey) {
    case "GET /items/{id}":
    case "GET /items":
      return await onGetOne(dynamo, tableName, event.pathParameters.id);

    default:
      throw new Error(`Unsupported route: "${event.routeKey}"`);
  }
};

