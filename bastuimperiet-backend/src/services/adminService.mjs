import { dynamoClient } from "../clients/dynamodbClient.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

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

export const getAllAdmins = async (tableName) => {
    const params = {
        TableName: tableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: {
            ":pk": "ADMIN",
        },
    };

    const result = await dynamoClient.send(new QueryCommand(params));
    if (!result.Items) return [];

    return result.Items.map(({ passwordHash, ...admin }) => admin);
};

export const getAdminByEmail = async (tableName, email) => {
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
    if (!result.Items || result.Items.length === 0) return null;

    const { passwordHash, ...admin } = result.Items[0];
    return admin;
};

export async function updateAdmin(tableName, email, updates) {
    const allowedFields = ["username", "phone"];

    let updateExpression = "SET ";
    const ExpressionAttributeNames = {};
    const ExpressionAttributeValues = {};

    let first = true;
    for (const key of Object.keys(updates)) {
        if (!allowedFields.includes(key)) continue;

        if (!first) {
            updateExpression += ", ";
        }

        updateExpression += `#${key} = :${key}`;
        ExpressionAttributeNames[`#${key}`] = key;
        ExpressionAttributeValues[`:${key}`] = updates[key];

        first = false;
    }

    if (first) {
        throw new Error("Inga giltiga fält att uppdatera");
    }

    const params = {
        TableName: tableName,
        Key: {
            PK: `ADMIN#${email}`,
            SK: "ADMIN",
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: "ALL_NEW",
    };

    const result = await dynamoClient.send(new UpdateCommand(params));
    const { passwordHash, ...admin } = result.Attributes;
    return admin;
}

// Funktion för att uppdatera admin-lösenord
export async function updateAdminPassword(tableName, email, newPassword) {
    const passwordHash = bcrypt.hashSync(newPassword, 10);

    const params = {
        TableName: tableName,
        Key: {
            PK: `ADMIN#${email}`,
            SK: "ADMIN",
        },
        UpdateExpression: "SET passwordHash = :passwordHash",
        ExpressionAttributeValues: {
            ":passwordHash": passwordHash,
        },
        ReturnValues: "NONE",
    };

    await dynamoClient.send(new UpdateCommand(params));

    return { message: "Lösenord uppdaterat" };
}

export const getAdminWithPassword = async (tableName, email) => {
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

    if (!result.Items || result.Items.length === 0) return null;

    return result.Items[0]; // inkluderar passwordHash
};

// Funktion som först verifierar det gamla lösenordet innan det nya uppdateras
export async function changeAdminPassword(tableName, email, oldPassword, newPassword) {
    const admin = await getAdminWithPassword(tableName, email);

    const valid = bcrypt.compareSync(oldPassword, admin.passwordHash);

    if (!valid) {
        throw new Error("Felaktigt nuvarande lösenord");
    }

    return await updateAdminPassword(tableName, email, newPassword);
}
