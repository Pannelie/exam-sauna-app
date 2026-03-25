import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { updateAdmin } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const body = event.body;

    if (!body?.username && !body?.email && !body?.phone) {
        const error = new Error("Minst ett giltigt fält måste skickas: username, email eller phone");
        error.statusCode = 400;
        throw error;
    }
    const updatedAdmin = await updateAdmin(process.env.TABLE_NAME, event.admin.email, body);

    if (!updatedAdmin) {
        const error = new Error("Admin kunde inte uppdateras");
        error.statusCode = 400;
        throw error;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAdmin),
    };
})
    .use(httpJsonBodyParser())
    .use(verifyAdminToken())
    .use(errorHandler());
