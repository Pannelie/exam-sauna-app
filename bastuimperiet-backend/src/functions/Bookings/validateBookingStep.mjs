// backend/src/functions/validateStep.mjs
import { bookingSchema } from "../../schemas/bookingSchema.mjs";

export const handler = async (event) => {
    const { step, data } = JSON.parse(event.body);

    // Definiera vilka fält som hör till vilket steg i frontenden
    const stepFields = {
        0: ["startDate", "endDate"],
        1: ["name", "email", "phone", "address", "postalCode", "city"],
    };

    const currentFields = stepFields[step] || [];

    // Vi validerar hela schemat men tillåter att fält saknas (presence: 'optional')
    // och tillåter okända fält (allowUnknown)
    const { error } = bookingSchema.validate(data, {
        abortEarly: false,
        allowUnknown: true,
    });

    if (error) {
        const errors = {};
        // Vi filtrerar felen så att vi bara skickar tillbaka de som hör till JUST DETTA steg
        error.details.forEach((detail) => {
            const field = detail.path[0];
            if (currentFields.includes(field)) {
                errors[field] = detail.message;
            }
        });

        // Om vi hittade fel som hör till nuvarande steg, returnera dem
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
