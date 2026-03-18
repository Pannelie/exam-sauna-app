import { statusSchema } from "../schemas/statusSchema.mjs";
import { throwError } from "../utils/throwError.mjs";

export const validateStatus = () => ({
    before: (handler) => {
        const { error, value } = statusSchema.validate(handler.event.body);
        if (error) {
            return throwError(error.message, 400);
        }
        handler.event.body = value;
    },
});
