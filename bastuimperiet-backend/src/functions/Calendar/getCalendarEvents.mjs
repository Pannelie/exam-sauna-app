import { google } from "googleapis";
import middy from "@middy/core";
import { errorHandler } from "../../utils/errorHandler.mjs";

export const handler = middy(async () => {
    try {
        // 1. Ta bort '!' (TS-syntax) och kontrollera att variabeln finns
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
            throw new Error("Miljövariabeln GOOGLE_SERVICE_ACCOUNT_JSON saknas");
        }

        const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

        // 2. Fixa radbrytningar i private_key
        // Google-nyckeln i .env innehåller ofta "\n" som sträng,
        // den måste göras om till riktiga radbrytningar för att fungera.
        const privateKey = serviceAccount.private_key.replace(/\\n/g, "\n");

        const auth = new google.auth.JWT(serviceAccount.client_email, null, privateKey, [
            "https://www.googleapis.com/auth/calendar.readonly",
        ]);

        const calendar = google.calendar({ version: "v3", auth });

        const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events =
            response.data.items?.map((event) => ({
                id: event.id,
                title: event.summary,
                start: event.start?.dateTime || event.start?.date,
                end: event.end?.dateTime || event.end?.date,
            })) || [];

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(events),
        };
    } catch (error) {
        console.error("Calendar Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Kunde inte hämta kalenderdata",
                error: error.message, // Hjälper vid felsökning
            }),
        };
    }
}).use(errorHandler());
