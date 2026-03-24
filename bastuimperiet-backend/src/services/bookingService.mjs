import { formatBookingForFrontend } from "../utils/formatters.js";
import { dynamoClient as client } from "../clients/dynamodbClient.mjs";
import { calculatePrice } from "../utils/priceEngine.mjs";
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
        name,
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

    // Spara startDate och endDate som bara datum (YYYY-MM-DD)
    const baseStart = startDate.split("T")[0];
    const baseEnd = endDate.split("T")[0];

    // 2. Bygg de korrekta tidssträngarna manuellt
    const finalStart = `${baseStart}T15:00:00`;
    const finalEnd = `${baseEnd}T11:00:00`;

    if (hasBookingOverlap(finalStart, finalEnd, allBookings)) {
        const error = new Error("Datumet är redan bokat");
        error.code = 409;
        throw error;
    }

    const priceData = await getPrices();
    const totalPrice = calculatePrice(priceData.prices, priceData.specialDays, {
        startDate,
        endDate,
        cleaning,
        firewood,
        scent,
        delivery,
    });

    if (isNaN(totalPrice)) {
        console.error("Price Engine returned NaN. Check priceData:", priceData);
        throw new Error("Kunde inte beräkna priset korrekt.");
    }

    const status = "pending";

    const item = {
        PK: `BOOKING#${id}`,
        SK: "BOOKING",

        id,
        name,
        email,
        phone,

        address,
        postalCode,
        city,

        startDate: finalStart,
        endDate: finalEnd,

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
    console.log("Bokning skapad:", item);
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

export function hasBookingOverlap(startDate, endDate, allBookings, currentBookingId = null) {
    console.log("Kollar överlapp med start:", startDate, "och end:", endDate);
    const newStart = new Date(startDate).getTime();
    const newEnd = new Date(endDate).getTime();

    if (isNaN(newStart) || isNaN(newEnd)) {
        console.error("DEBUG: Ogiltiga datum i hasBookingOverlap:", { startDate, endDate });
        return false;
    }

    return allBookings.some((booking) => {
        if (currentBookingId && booking.id === currentBookingId) return false;

        if (booking.status !== "confirmed") return false;

        const existingStart = new Date(booking.startDate).getTime();
        const existingEnd = new Date(booking.endDate).getTime();
        if (isNaN(existingStart) || isNaN(existingEnd)) return false;

        return newStart < existingEnd && newEnd > existingStart;
    });
}

export function validateBookingRequest(data, allBookings) {
    const now = new Date();
    const cleanStartStr = data.startDate.split("T")[0];
    const cleanEndStr = data.endDate.split("T")[0];

    const start = new Date(`${cleanStartStr}T15:00:00`);
    const end = new Date(`${cleanEndStr}T11:00:00`);

    // Steg A: Kolla dåtid
    if (start < now) {
        return { isValid: false, message: "Datumet har redan passerat", status: 400 };
    }

    // Steg B: Kolla logik (minst 1 natt)
    if (end <= start) {
        return { isValid: false, message: "Utcheckning måste vara efter incheckning", status: 400 };
    }

    // Steg C: Kolla krockar (återanvänder funktionen ovan)
    if (hasBookingOverlap(start.toISOString(), end.toISOString(), allBookings)) {
        return { isValid: false, message: "Datumen är redan bokade", status: 409 };
    }

    return { isValid: true };
}
