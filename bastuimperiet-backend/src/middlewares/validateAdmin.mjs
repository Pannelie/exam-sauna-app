import { adminSchema } from "../schemas/adminSchema.mjs";
import { throwError } from "../utils/throwError.mjs";

export const validateAdmin = () => ({
    before: (handler) => {
        const { error, value } = adminSchema.validate(handler.event.body);
        console.log("Admin validation error:", error);
        console.log("Admin validation value:", value);

        if (error) {
            return throwError(error.message, 400);
        }
    },
});
