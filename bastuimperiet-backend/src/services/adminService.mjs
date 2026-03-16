import { dynamoClient } from "../clients/dynamodbClient.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export async function loginAdmin(tableName, email, password) {
    const params = {
        TableName: tableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk AND GSI1SK = :sk",
        ExpressionAttributeValues: {
            ":pk": "ADMIN",
            ":sk": email,
        },
    };

    const result = await dynamoClient.send(new QueryCommand(params));
    const adminItem = result.Items[0];
    if (!adminItem) {
        throw new Error("Felaktiga inloggningsuppgifter");
    }

    const valid = bcrypt.compareSync(password, adminItem.passwordHash);
    if (!valid) {
        throw new Error("Felaktiga inloggningsuppgifter");
    }

    const token = jwt.sign(
        {
            role: "admin",
            email: adminItem.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
    );

    return {
        token,
        admin: {
            email: adminItem.email,
        },
    };
}
