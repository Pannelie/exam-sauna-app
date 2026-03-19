import { google } from "googleapis";
import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async () => {
    try {
        const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

        if (!rawJson) {
            console.error("FEL: GOOGLE_SERVICE_ACCOUNT_JSON saknas i process.env");
            throw new Error("Miljökonfiguration saknas");
        }

        const serviceAccount = JSON.parse(rawJson);

        // Fixa nyckeln
        const privateKey = serviceAccount.private_key.replace(/\\n/g, "\n");

        const auth = new google.auth.JWT(serviceAccount.client_email, null, privateKey, [
            "https://www.googleapis.com/auth/calendar.readonly",
        ]);

        // Skapa klienten
        const calendar = google.calendar({ version: "v3", auth });

        const response = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events =
            response.data.items?.map((event) => ({
                id: event.id,
                title: event.summary || "Bokning",
                start: event.start?.dateTime || event.start?.date,
                end: event.end?.dateTime || event.end?.date,
            })) || [];

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(events),
        };
    } catch (error) {
        console.error("Calendar Lambda Error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
}).use(errorHandler()); // Kommentera bort denna om filen inte hittas
