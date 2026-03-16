import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "eu-north-1",
});

const priceConfig = {
    PK: "CONFIG",
    SK: "PRICES",
    // Vi lägger alla priser i ett eget objekt
    priceList: {
        weekday: 600,
        weekend: 800,
        special: 950,
        weekly: 2000,
        monthly: 6000,
        cleaning: 995,
        firewood: 40,
        scent: 30,
        delivery: 1000,
    },
    // Nu kan du enkelt lägga till specialdagar här!
    specialDays: [
        "2026-06-19", // Midsommarafton
        "2026-12-24", // Julafton
        "2026-12-31", // Nyår
    ],
    updatedAt: new Date().toISOString(),
};

async function seedPrices() {
    try {
        await dynamo
            .put({
                TableName: process.env.TABLE_NAME,
                Item: priceConfig,
            })
            .promise();

        console.log("Prislistan och specialdagar har seedats som ett objekt!");
    } catch (err) {
        console.error("Fel vid seedning:", err);
    }
}

seedPrices();
