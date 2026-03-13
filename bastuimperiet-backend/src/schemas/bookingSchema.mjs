import Joi from "joi";

export const bookingSchema = Joi.object({
    guestName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(20).required(),
    address: Joi.string().min(2).max(200).required(),
    postalCode: Joi.string().min(2).max(20).required(),
    city: Joi.string().min(2).max(100).required(),
    startDate: Joi.string().isoDate().required(),
    endDate: Joi.string().isoDate().required(),
    cleaning: Joi.boolean().default(false),
    firewood: Joi.number().integer().min(0).default(0),
    scent: Joi.number().integer().min(0).default(0),
    delivery: Joi.boolean().default(false),
    transportType: Joi.string().valid("oneWay", "return").allow(null).messages({
        "any.only": "transportType måste vara 'oneWay' eller 'return'",
    }),
    totalPrice: Joi.number().min(0).required(),
    status: Joi.string().valid("pending", "confirmed", "declined", "cancelled").required(),
});
