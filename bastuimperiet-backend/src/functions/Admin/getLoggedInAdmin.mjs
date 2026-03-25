import middy from "@middy/core";
import { verifyAdminToken } from "../../middlewares/verifyAdminToken.js";
import { getAdminByEmail } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    console.log("event.admin:", event.admin);
    console.log("event:", event);
    const email = event.admin.email;

    const admin = await getAdminByEmail(process.env.TABLE_NAME, email);

    console.log("profile Admin fetched:", admin);
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
    .use(verifyAdminToken())
    .use(errorHandler());
