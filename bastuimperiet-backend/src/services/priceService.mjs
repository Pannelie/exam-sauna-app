import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function getPrices() {
    const res = await client.send(
        new QueryCommand({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: { ":pk": "PRICES" },
        }),
    );

    const prices = {};
    res.Items.forEach((item) => {
        prices[item.SK] = item.price;
    });

    return prices;
}
