import { getAccessToken } from "../utils/googleAuthHelper.js";

const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
const timeZone = process.env.GOOGLE_CALENDAR_TIMEZONE || "Europe/Stockholm";

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
export async function fetchCalendarEvents(timeMin) {
    const accessToken = await getAccessToken();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?timeMin=${encodeURIComponent(timeMin)}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) throw new Error(`Google API Error: ${await response.text()}`);

    const data = await response.json();

    // Mappa om Google-data till det format din Frontend vill ha
    return (
        data.items?.map((event) => {
            console.log(`Event: ${event.summary}, Private Props:`, event.extendedProperties?.private);

            return {
                id: event.id,
                title: event.summary || "Bokning",
                start: event.start?.dateTime || event.start?.date,
                end: event.end?.dateTime || event.end?.date,
                extendedProps: {
                    bookingId: event.extendedProperties?.private?.bookingId || null,
                },
            };
        }) || []
    );
}

export async function createBookingCalendarEvent({
    id,
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
    const accessToken = await getAccessToken();
    const range = buildCalendarDateRange(startDate, endDate);

    const eventBody = {
        summary: name,
        description: `\nBokningsnummer: ${id}\n\nKund:\n${name}\n${email}\n${phone}\n\nAdress:\n${address || "-"}\n${postalCode || ""} ${city || ""}\n\nTillägg:\nStädning: ${cleaning ? "Ja" : "Nej"}\nVed: ${firewood} paket\nDoft: ${scent || "Ingen"}\n\nTransport:\nUtkörning: ${delivery ? "Ja" : "Nej"}\nTyp: ${transportType || "-"}\n\nPris:\n${totalPrice} kr\n`,
        start: {
            dateTime: range.startDateTime,
            timeZone,
        },
        end: {
            dateTime: range.endDateTime,
            timeZone,
        },
        extendedProperties: {
            private: {
                bookingId: String(id), // Här sparar vi kopplingen!
            },
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
    const accessToken = await getAccessToken();

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
