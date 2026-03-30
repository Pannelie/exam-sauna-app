import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import { changeAdminPassword } from "../../services/adminService.mjs";
import { validateAdmin } from "../../middlewares/validateAdmin.mjs";
import { changePasswordSchema } from "../../schemas/adminSchema.mjs";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const body = event.body;

    if (!body?.oldPassword || !body?.newPassword) {
        const error = new Error("Både gammalt och nytt lösenord måste skickas");
        error.statusCode = 400;
        throw error;
    }

    await changeAdminPassword(process.env.TABLE_NAME, event.admin.email, body.oldPassword, body.newPassword);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lösenord uppdaterat" }),
    };
})
    .use(httpJsonBodyParser())
    .use(verifyAdminToken())
    .use(validateAdmin(changePasswordSchema))
    .use(errorHandler());
