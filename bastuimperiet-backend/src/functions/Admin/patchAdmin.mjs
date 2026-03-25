import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { updateAdmin } from "../..adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const body = event.body;

    const updatedAdmin = await updateAdmin(process.env.TABLE_NAME, event.admin.email, body);

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAdmin),
    };
})
    .use(httpJsonBodyParser())
    .use(verifyAdminToken())
    .use(errorHandler());
