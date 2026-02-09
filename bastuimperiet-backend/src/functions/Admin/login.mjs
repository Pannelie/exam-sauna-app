import dotenv from "dotenv";
import { loginAdmin } from "../../services/adminService.mjs";

dotenv.config();

export const handler = async (event) => {
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
};
