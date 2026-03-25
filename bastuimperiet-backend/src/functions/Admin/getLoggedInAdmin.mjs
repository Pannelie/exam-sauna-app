import middy from "@middy/core";
import { validateAdmin } from "../../middlewares/validateAdmin.mjs";
import { getAdminByEmail } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    const email = event.admin.email;

    const admin = await getAdminByEmail(process.env.TABLE_NAME, email);

    if (!admin) {
        const error = new Error("Admin hittades inte");
        error.statusCode = 404; // <-- viktigt
        throw error;
    }
    return {
        statusCode: 200,
        body: JSON.stringify(admin),
    };
})
    .use(validateAdmin())
    .use(errorHandler());
