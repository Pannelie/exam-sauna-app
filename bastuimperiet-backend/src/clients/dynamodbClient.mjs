import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

if (!process.env.AWS_REGION) {
    console.warn("AWS_REGION saknas, defaultar till eu-north-1");
}

const client = new DynamoDBClient({
    region: process.env.AWS_REGION || "eu-north-1",
});

export const dynamoClient = DynamoDBDocumentClient.from(client);
