import { formatBookingForFrontend } from "../utils/formatters.js";
import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { calculatePrice } from "../services/priceEngine.mjs";
import { getPrices } from "../services/priceService.mjs";
import { v4 as uuidv4 } from "uuid";
import { GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

function generateShortId(length = 5) {
    return uuidv4().replace(/-/g, "").slice(0, length);
}

export async function getAllBookings(tableName, status = null, ascending = true) {
    const params = {
        TableName: tableName,
        IndexName: status ? "GSI1" : "GSI2",
        KeyConditionExpression: status ? "GSI1PK = :pk" : "GSI2PK = :pk",
        ExpressionAttributeValues: {
            ":pk": status ? `STATUS#${status}` : "BOOKING",
        },
        ScanIndexForward: ascending,
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
    const allBookings = await getAllBookings(tableName);
    const id = generateShortId(); // Generera id här
    const {
        guestName,
        email,
        phone,
        address,
        postalCode,
        city,
        startDate,
        endDate,
        cleaning = false,
        firewood = 0,
        scent = 0,
        delivery = false,
        transportType = null,
    } = bookingData;

    if (hasBookingOverlap(startDate, endDate, allBookings)) {
        const error = new Error("Datumet är redan bokat");
        error.code = 409;
        throw error;
    }

    const prices = await getPrices();
    const specialDays = ["2026-04-18", "2026-06-06"];
    const totalPrice = calculatePrice(prices, specialDays, {
        startDate,
        endDate,
        cleaning,
        firewood,
        scent,
        delivery,
    });
    const status = "pending";

    const item = {
        PK: `BOOKING#${id}`,
        SK: "BOOKING",

        id,
        guestName,
        email,
        phone,

        address,
        postalCode,
        city,

        startDate,
        endDate,

        scent,
        cleaning,
        firewood,

        delivery,
        transportType,

        status: status,
        totalPrice,
        createdAt: new Date().toISOString(),

        GSI1PK: `STATUS#${status}`,
        GSI1SK: startDate,

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

export async function updateBookingStatus(tableName, bookingId, newStatus) {
    const current = await getBookingByIdInternal(tableName, bookingId);
    if (!current) throw new Error("Bokning hittades inte");

    const params = {
        TableName: tableName,
        Key: { PK: `BOOKING#${bookingId}`, SK: "BOOKING" },
        UpdateExpression: "SET #s = :status, GSI1PK = :gsi1pk, GSI1SK = :gsi1sk",
        ConditionExpression: "attribute_exists(PK)",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: {
            ":status": newStatus,
            ":gsi1pk": `STATUS#${newStatus}`,
            ":gsi1sk": current.startDate,
        },
        ReturnValues: "ALL_NEW",
    };

    const result = await client.send(new UpdateCommand(params));
    return formatBookingForFrontend(result.Attributes);
}

export async function saveCalendarEventId(tableName, bookingId, calendarEventId) {
    const params = {
        TableName: tableName,
        Key: {
            PK: `BOOKING#${bookingId}`,
            SK: "BOOKING",
        },
        UpdateExpression: "SET calendarEventId = :id",
        ExpressionAttributeValues: {
            ":id": calendarEventId,
        },
    };
    await client.send(new UpdateCommand(params));
}

export function hasBookingOverlap(startDate, endDate, existingBookings) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return existingBookings.some((booking) => {
        const bookingStart = new Date(booking.startDate);
        const bookingEnd = new Date(booking.endDate);

        return start < bookingEnd && end > bookingStart;
    });
}
