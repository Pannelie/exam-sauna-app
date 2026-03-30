import { throwError } from "../utils/throwError.mjs";

export const validateAdmin = (schema) => ({
    before: (handler) => {
        const { error, value } = schema.validate(handler.event.body, {
            abortEarly: false, // Visar alla fel, inte bara det första
            stripUnknown: true, // Tar bort fält som inte finns i schemat
        });

        if (error) {
            const errorMessage = error.details.map((d) => d.message).join(", ");
            return throwError(errorMessage, 400);
        }

        handler.event.body = value;
    },
});
