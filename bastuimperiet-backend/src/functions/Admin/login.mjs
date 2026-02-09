import dotenv from "dotenv";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { verifyAdmin } from "../../middlewares/validateAdmin.mjs";
import { loginAdmin } from "../../services/adminService.mjs";

dotenv.config();

export const handler = middy(async (event) => {
    try {
        const { email, password } = JSON.parse(event.body);

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
    .use(verifyAdmin());
