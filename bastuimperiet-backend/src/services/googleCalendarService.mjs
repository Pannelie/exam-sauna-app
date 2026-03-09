import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

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

function toEventDateTime(dateString, hour) {
    return `${dateString}T${String(hour).padStart(2, "0")}:00:00`;
}

export async function createBookingCalendarEvent({ bookingId, guestName, email, phone, startDate, endDate, totalPrice }) {
    const serviceAccount = parseServiceAccount();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
    const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Europe/Stockholm";

    const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,
        scopes: SCOPES,
    });

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.events.insert({
        calendarId,
        requestBody: {
            summary: `Bastu-bokning: ${guestName}`,
            description: `Boknings-id: ${bookingId}\nNamn: ${guestName}\nE-post: ${email}\nTelefon: ${phone}\nTotalpris: ${totalPrice} kr`,
            start: {
                dateTime: toEventDateTime(startDate, 15),
                timeZone,
            },
            end: {
                dateTime: toEventDateTime(endDate, 11),
                timeZone,
            },
            attendees: email ? [{ email }] : [],
        },
    });

    return response.data;
}
