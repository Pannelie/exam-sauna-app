import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { validateAdmin } from "../../middlewares/validateAdmin.mjs";
import { loginSchema } from "../../schemas/adminSchema.mjs";
import { loginAdmin } from "../../services/adminService.mjs";
import { errorHandler } from "../../middlewares/errorHandler.js";

export const handler = middy(async (event) => {
    try {
        const { email, password } = event.body;

        const result = await loginAdmin(process.env.TABLE_NAME, email, password);

        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (err) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: err.message }),
        };
    }
})
    .use(httpJsonBodyParser())
    .use(validateAdmin(loginSchema))
    .use(errorHandler());
