import { bookingSchema } from "../schemas/bookingSchema.mjs";
import { throwError } from "../utils/throwError.mjs";

export const validateBooking = () => ({
    before: (handler) => {
        const { error, value } = bookingSchema.validate(handler.event.body);
        if (error) {
            return throwError(error.message, 400);
        }
        handler.event.body = value;
    },
});
