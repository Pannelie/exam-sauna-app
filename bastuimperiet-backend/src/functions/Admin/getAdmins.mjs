import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import { getAllAdmins } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const admins = await getAllAdmins(process.env.TABLE_NAME);

    if (!admins) {
        const error = new Error("Inga admins hittades");
        error.statusCode = 404;
        throw error;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(admins || []),
    };
})
    .use(verifyAdminToken())
    .use(errorHandler());
