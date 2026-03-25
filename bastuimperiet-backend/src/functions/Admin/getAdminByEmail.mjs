import middy from "@middy/core";
import { validateAdmin } from "../../middlewares/validateAdmin.mjs";
import { getAdminByEmail } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const { email } = event.pathParameters;

    const admin = await getAdminByEmail(process.env.TABLE_NAME, email);

    return {
        statusCode: 200,
        body: JSON.stringify(admin),
    };
})
    .use(validateAdmin())
    .use(errorHandler());
