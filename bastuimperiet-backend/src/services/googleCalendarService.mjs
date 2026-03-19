import crypto from "node:crypto";
import { title } from "node:process";

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar";

function parseServiceAccount() {
    const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!rawJson) {
        throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON configuration");
    }

    try {
        return JSON.parse(rawJson);
    } catch {
        throw new Error("Invalid GOOGLE_SERVICE_ACCOUNT_JSON value");
    }
}

function toBase64Url(value) {
    return Buffer.from(value).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function createSignedJwt(serviceAccount) {
    const now = Math.floor(Date.now() / 1000);

    const header = {
        alg: "RS256",
        typ: "JWT",
    };

    const payload = {
        iss: serviceAccount.client_email,
        scope: GOOGLE_CALENDAR_SCOPE,
        aud: GOOGLE_TOKEN_URL,
        iat: now,
        exp: now + 3600,
    };

    const encodedHeader = toBase64Url(JSON.stringify(header));
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const unsignedToken = `${encodedHeader}.${encodedPayload}`;

    const signer = crypto.createSign("RSA-SHA256");
    signer.update(unsignedToken);
    signer.end();

    const signature = signer.sign(serviceAccount.private_key);
    const encodedSignature = signature.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

    return `${unsignedToken}.${encodedSignature}`;
}

async function getAccessToken(serviceAccount) {
    const assertion = createSignedJwt(serviceAccount);

    const response = await fetch(GOOGLE_TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Google token error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    return data.access_token;
}

function toEventDateTime(dateString, hour) {
    // Skapa ISO-sträng med lokal tid (utan extra Z eller dubbla tider)
    return `${dateString}T${String(hour).padStart(2, "0")}:00:00`;
}

function addDays(dateString, days) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + days);

    const nextYear = date.getUTCFullYear();
    const nextMonth = String(date.getUTCMonth() + 1).padStart(2, "0");
    const nextDay = String(date.getUTCDate()).padStart(2, "0");

    return `${nextYear}-${nextMonth}-${nextDay}`;
}

function buildCalendarDateRange(startDate, endDate) {
    // Ta bort tid och .000Z om det finns
    const cleanDate = (d) => d.split("T")[0];
    let calendarStartDate = cleanDate(startDate);
    let calendarEndDate = cleanDate(endDate);
    const startTs = Date.parse(`${calendarStartDate}T15:00:00`);
    let endTs = Date.parse(`${calendarEndDate}T11:00:00`);
    while (endTs <= startTs) {
        calendarEndDate = addDays(calendarEndDate, 1);
        endTs = Date.parse(`${calendarEndDate}T11:00:00`);
    }
    const startDateTime = `${calendarStartDate}T15:00:00`;
    const endDateTime = `${calendarEndDate}T11:00:00`;
    return {
        startDateTime,
        endDateTime,
    };
}

export async function getCalendarBookings() {
    const serviceAccount = parseServiceAccount();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    const accessToken = await getAccessToken(serviceAccount);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Google Calendar fetch error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();

    return data.items.map((event) => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
    }));
}

export async function createBookingCalendarEvent({
    bookingId,
    name,
    email,
    phone,
    address,
    postalCode,
    city,
    cleaning,
    firewood,
    scent,
    delivery,
    transportType,
    startDate,
    endDate,
    totalPrice,
}) {
    const serviceAccount = parseServiceAccount();
    // calendarId kan skickas in, annars används GOOGLE_CALENDAR_ID
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Europe/Stockholm";

    const accessToken = await getAccessToken(serviceAccount);
    const range = buildCalendarDateRange(startDate, endDate);

    const eventBody = {
        summary: name,
        description: `\nBokningsnummer: ${bookingId}\n\nKund:\n${name}\n${email}\n${phone}\n\nAdress:\n${address || "-"}\n${postalCode || ""} ${city || ""}\n\nTillägg:\nStädning: ${cleaning ? "Ja" : "Nej"}\nVed: ${firewood} paket\nDoft: ${scent || "Ingen"}\n\nTransport:\nUtkörning: ${delivery ? "Ja" : "Nej"}\nTyp: ${transportType || "-"}\n\nPris:\n${totalPrice} kr\n`,
        start: {
            dateTime: range.startDateTime,
            timeZone,
        },
        end: {
            dateTime: range.endDateTime,
            timeZone,
        },
    };
    console.log("Google Calendar create eventBody:", eventBody);
    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(eventBody),
    });

    const responseText = await response.text();
    console.log("Google Calendar create response:", response.status, responseText);
    if (!response.ok) {
        throw new Error(`Google Calendar API error (${response.status}): ${responseText}`);
    }

    return JSON.parse(responseText);
}
export async function deleteBookingCalendarEvent(eventId) {
    if (!eventId) return true;
    const serviceAccount = parseServiceAccount();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const accessToken = await getAccessToken(serviceAccount);

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Google Calendar delete error (${response.status}): ${errorBody}`);
    }

    return true; // lyckad radering
}
