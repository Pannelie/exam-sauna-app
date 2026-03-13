import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "eu-north-1",
});

const TABLE_NAME = process.env.TABLE_NAME;

if (!TABLE_NAME) {
    console.error("TABLE_NAME saknas i .env");
    process.exit(1);
}

const prices = {
    weekday: 600,
    weekend: 800,
    special: 950,
    weekly: 2000,
    monthly: 6000,
    cleaning: 995,
    firewood: 40,
    scent: 30,
    delivery: 1000,
};

async function seedPrices() {
    for (const [key, price] of Object.entries(prices)) {
        const item = {
            PK: "PRICES",
            SK: key,
            price,
            createdAt: new Date().toISOString(),
        };

        try {
            await dynamo
                .put({
                    TableName: TABLE_NAME,
                    Item: item,
                    ConditionExpression: "attribute_not_exists(PK) AND attribute_not_exists(SK)",
                })
                .promise();

            console.log(`Seeded price: ${key} = ${price}`);
        } catch (err) {
            if (err.code === "ConditionalCheckFailedException") {
                console.log(`Pris finns redan: ${key}`);
            } else {
                console.error("Fel vid skapande av pris:", err);
            }
        }
    }

    console.log("Alla priser har seedats!");
}

seedPrices();
