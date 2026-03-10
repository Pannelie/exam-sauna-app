import Joi from "joi";

export const adminSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Ogiltig e-post",
        "any.required": "E-post krävs",
        "string.empty": "E-post krävs",
    }),
    password: Joi.string().required().messages({
        "any.required": "Lösenord krävs",
        "string.empty": "Lösenord krävs",
    }),
});
