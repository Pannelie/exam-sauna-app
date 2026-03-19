import Joi from "joi";
export const statusSchema = Joi.object({
    status: Joi.string().valid("pending", "confirmed", "declined", "cancelled").required(),
    force: Joi.boolean().optional(),
});
