import Joi from "joi";

export const bookingSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Namn krävs",
        "string.min": "Namn måste vara minst 2 tecken",
        "string.max": "Namn får vara max 100 tecken",
        "any.required": "Namn krävs",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "E-post krävs",
        "string.email": "Ogiltig e-postadress",
        "any.required": "E-post krävs",
    }),
    phone: Joi.string().min(6).max(20).required().messages({
        "string.empty": "Telefonnummer krävs",
        "string.min": "Telefonnummer måste vara minst 6 siffror",
        "string.max": "Telefonnummer får vara max 20 siffror",
        "any.required": "Telefonnummer krävs",
    }),
    address: Joi.string().min(2).max(200).required().messages({
        "string.empty": "Adress krävs",
        "string.min": "Adress måste vara minst 2 tecken",
        "string.max": "Adress får vara max 200 tecken",
        "any.required": "Adress krävs",
    }),
    postalCode: Joi.string().min(2).max(20).required().messages({
        "string.empty": "Postnummer krävs",
        "string.min": "Postnummer måste vara minst 2 tecken",
        "string.max": "Postnummer får vara max 20 tecken",
        "any.required": "Postnummer krävs",
    }),
    city: Joi.string().min(2).max(100).required().messages({
        "string.empty": "Stad krävs",
        "string.min": "Stad måste vara minst 2 tecken",
        "string.max": "Stad får vara max 100 tecken",
        "any.required": "Stad krävs",
    }),
    startDate: Joi.string().isoDate().required().messages({
        "string.empty": "Startdatum krävs",
        "string.isoDate": "Ogiltigt startdatum",
        "any.required": "Startdatum krävs",
    }),
    endDate: Joi.string().isoDate().required().messages({
        "string.empty": "Slutdatum krävs",
        "string.isoDate": "Ogiltigt slutdatum",
        "any.required": "Slutdatum krävs",
    }),
    cleaning: Joi.boolean().default(false),
    firewood: Joi.number().integer().min(0).default(0).messages({
        "number.base": "Ved måste vara ett heltal",
        "number.min": "Ved kan inte vara negativt",
    }),
    scent: Joi.number().integer().min(0).default(0).messages({
        "number.base": "Doft måste vara ett heltal",
        "number.min": "Doft kan inte vara negativt",
    }),
    delivery: Joi.boolean().default(false),
    transportType: Joi.string().valid("oneWay", "return").allow(null).messages({
        "any.only": "transportType måste vara 'oneWay' eller 'return'",
    }),
    totalPrice: Joi.number().min(0).required().messages({
        "number.base": "Totalpris måste vara ett nummer",
        "number.min": "Totalpris kan inte vara negativt",
        "any.required": "Totalpris krävs",
    }),
    status: Joi.string().valid("pending", "confirmed", "declined", "cancelled").required().messages({
        "any.only": "Status måste vara pending, confirmed, declined eller cancelled",
        "any.required": "Status krävs",
    }),
});
