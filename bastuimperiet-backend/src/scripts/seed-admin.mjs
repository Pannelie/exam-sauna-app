import AWS from "aws-sdk";
import * as bcrypt from "bcryptjs"; // <-- ändrad import
import dotenv from "dotenv";

dotenv.config();

const dynamo = new AWS.DynamoDB.DocumentClient({
    region: "eu-north-1",
});

const TABLE_NAME = process.env.TABLE_NAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPhone = process.env.ADMIN_PHONE;

if (!TABLE_NAME || !adminPassword || !adminEmail || !adminUsername || !adminPhone) {
    console.error("TABLE_NAME, ADMIN_PASSWORD, ADMIN_EMAIL, ADMIN_USERNAME eller ADMIN_PHONE saknas i .env");
    process.exit(1);
}

async function seedAdmin() {
    const passwordHash = bcrypt.hashSync(adminPassword, 10);

    const item = {
        PK: `ADMIN#${adminEmail}`,
        SK: "ADMIN",

        email: adminEmail,
        username: adminUsername,
        phone: adminPhone,

        passwordHash,

        GSI1PK: "ADMIN",
        GSI1SK: adminEmail,
    };

    try {
        await dynamo
            .put({
                TableName: TABLE_NAME,
                Item: item,
                ConditionExpression: "attribute_not_exists(PK)",
            })
            .promise();

        console.log("Admin skapad:", adminEmail);
    } catch (err) {
        if (err.code === "ConditionalCheckFailedException") {
            console.log("Admin finns redan:", adminEmail);
        } else {
            console.error("Fel vid skapande av admin:", err);
        }
    }
}

seedAdmin();
