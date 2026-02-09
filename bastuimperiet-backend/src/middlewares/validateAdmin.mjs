export const validateAdmin = () => ({
    before: (handler) => {
        const { error, value } = adminSchema.validate(handler.event.body);
        console.log("Admin validation error:", error);
        console.log("Admin validation value:", value);

        if (error) {
            return throwError(error.message, 400);
        }

        handler.event.body = value;
    },
});
