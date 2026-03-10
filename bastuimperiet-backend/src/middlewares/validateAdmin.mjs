import { adminSchema } from "../schemas/adminSchema.mjs";
import { throwError } from "../utils/throwError.mjs";

export const validateAdmin = () => ({
    before: (handler) => {
        const { error, value } = adminSchema.validate(handler.event.body);

        if (error) {
            return throwError(error.message, 400);
        }

        handler.event.body = value;
    },
});
