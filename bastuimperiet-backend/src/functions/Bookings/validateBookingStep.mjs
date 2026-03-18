import { bookingSchema } from "../../schemas/bookingSchema.mjs";

export const handler = async (event) => {
    const { step, data } = JSON.parse(event.body);

    const stepFields = {
        0: ["startDate", "endDate"],
        1: ["name", "email", "phone", "address", "postalCode", "city"],
    };

    const currentFields = stepFields[step] || [];

    const { error } = bookingSchema.validate(data, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        const errors = {};

        error.details.forEach((detail) => {
            const field = detail.path[0];
            if (currentFields.includes(field)) {
                errors[field] = detail.message;
            }
        });

        if (Object.keys(errors).length > 0) {
            return {
                statusCode: 400,
                headers: { "Access-Control-Allow-Origin": "*" },
                body: JSON.stringify({ valid: false, errors }),
            };
        }
    }

    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ valid: true }),
    };
};
