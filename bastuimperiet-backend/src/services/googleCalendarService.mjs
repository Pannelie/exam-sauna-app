import crypto from "node:crypto";

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
    let calendarEndDate = endDate;
    const startTs = Date.parse(toEventDateTime(startDate, 15));
    let endTs = Date.parse(toEventDateTime(calendarEndDate, 11));

    while (endTs <= startTs) {
        calendarEndDate = addDays(calendarEndDate, 1);
        endTs = Date.parse(toEventDateTime(calendarEndDate, 11));
    }

    return {
        startDateTime: toEventDateTime(startDate, 15),
        endDateTime: toEventDateTime(calendarEndDate, 11),
    };
}

export async function createBookingCalendarEvent({
    bookingId,
    guestName,
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
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Europe/Stockholm";

    const accessToken = await getAccessToken(serviceAccount);
    const range = buildCalendarDateRange(startDate, endDate);

    const eventBody = {
        summary: `Bastu-bokning: ${guestName}`,
        description: `
Bokningsnummer: ${bookingId}

Kund:
${guestName}
${email}
${phone}

Adress:
${address || "-"}
${postalCode || ""} ${city || ""}

Tillägg:
Städning: ${cleaning ? "Ja" : "Nej"}
Ved: ${firewood} paket
Doft: ${scent || "Ingen"}

Transport:
Utkörning: ${delivery ? "Ja" : "Nej"}
Typ: ${transportType || "-"}

Pris:
${totalPrice} kr
`,
        start: {
            dateTime: range.startDateTime,
            timeZone,
        },
        end: {
            dateTime: range.endDateTime,
            timeZone,
        },
    };

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(eventBody),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Google Calendar API error (${response.status}): ${errorBody}`);
    }

    return response.json();
}

export async function deleteBookingCalendarEvent(eventId) {
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
