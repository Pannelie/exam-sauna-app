import { formatBookingForFrontend } from "../utils/formatters.js";
import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { calculateTotalPrice } from "../utils/calculatePrice.js"; // din tidigare logik
import { v4 as uuidv4 } from "uuid";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateShortId(length = 5) {
    return uuidv4().replace(/-/g, "").slice(0, length);
}

export async function getAllBookings(tableName) {
    const params = {
        TableName: tableName,
        IndexName: "GSI2",
        KeyConditionExpression: "GSI2PK = :pk",
        ExpressionAttributeValues: {
            ":pk": "BOOKING",
        },
        ScanIndexForward: true,
    };

    const result = await client.send(new QueryCommand(params));

    return result.Items.map(formatBookingForFrontend);
}

export async function getBookingById(tableName, bookingId) {
    const params = {
        TableName: tableName,
        Key: {
            PK: `BOOKING#${bookingId}`,
            SK: "BOOKING",
        },
    };

    const result = await client.send(new GetCommand(params));
    if (!result.Item) return null;

    return formatBookingForFrontend(result.Item);
}

export async function getBookingByIdInternal(tableName, bookingId) {
    const params = {
        TableName: tableName,
        Key: {
            PK: `BOOKING#${bookingId}`,
            SK: "BOOKING",
        },
    };

    const result = await client.send(new GetCommand(params));
    return result.Item || null;
}

export async function postBooking(tableName, bookingData) {
    const id = generateShortId(); // Generera id här
    const { guestName, email, phone, startDate, endDate, cleaning = false, firewood = 0 } = bookingData;

    const totalPrice = calculateTotalPrice(startDate, endDate, cleaning, firewood);

    const item = {
        PK: `BOOKING#${id}`,
        SK: "BOOKING",
        id,
        guestName,
        email,
        phone,
        startDate,
        endDate,
        cleaning,
        firewood,
        status: "pending",
        totalPrice,
        GSI2PK: "BOOKING",
        GSI2SK: startDate,
    };

    await client.send(
        new PutCommand({
            TableName: tableName,
            Item: item,
            ConditionExpression: "attribute_not_exists(PK)", // skriv inte över
        }),
    );

    return formatBookingForFrontend(item);
}

export async function updateBookingStatus(tableName, bookingId, status) {
    const params = {
        TableName: tableName,
        Key: { PK: `BOOKING#${bookingId}`, SK: "BOOKING" },
        UpdateExpression: "SET #s = :status",
        ConditionExpression: "attribute_exists(PK)",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":status": status },
        ReturnValues: "ALL_NEW",
    };

    const result = await client.send(new UpdateCommand(params));
    return formatBookingForFrontend(result.Attributes);
}
