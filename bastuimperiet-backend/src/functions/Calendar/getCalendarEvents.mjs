import middy from "@middy/core";
import { errorHandler } from "../../middlewares/errorHandler.js";
import { fetchCalendarEvents } from "../../services/googleCalendarService.mjs";

export const handler = middy(async () => {
    try {
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

        const events = await fetchCalendarEvents(twoMonthsAgo.toISOString());

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
}).use(errorHandler());
