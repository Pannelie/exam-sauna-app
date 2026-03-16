import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { GetCommand } from "@aws-sdk/lib-dynamodb"; // Byt till GetCommand

export async function getPrices() {
    const res = await client.send(
        new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key: {
                PK: "CONFIG",
                SK: "PRICES",
            },
        }),
    );

    if (!res.Item) {
        throw new Error("Prislista hittades inte i databasen");
    }

    // Eftersom vi sparade allt i ett objekt i seed-filen:
    // res.Item innehåller nu { priceList: {...}, specialDays: [...] }
    return {
        prices: res.Item.priceList,
        specialDays: res.Item.specialDays || [],
    };
}
