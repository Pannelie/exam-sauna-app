import Joi from "joi";

// Admin Login
export const loginSchema = Joi.object({
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

// Uppdate Profile
export const updateProfileSchema = Joi.object({
    username: Joi.string().min(3).max(30).optional().messages({
        "string.min": "Användarnamnet måste vara minst 3 tecken",
    }),
    phone: Joi.string()
        .pattern(/^[0-9+\s-]{7,15}$/)
        .optional()
        .messages({
            "string.pattern.base": "Ange ett giltigt telefonnummer",
        }),
    email: Joi.string().email().optional(),
}).min(1); // Kräver åtminstoneett fält

// Change password
export const changePasswordSchema = Joi.object({
    oldPassword: Joi.string().required().messages({
        "any.required": "Nuvarande lösenord krävs",
    }),
    newPassword: Joi.string().min(6).required().messages({
        "string.min": "Nytt lösenord måste vara minst 6 tecken",
        "any.required": "Nytt lösenord krävs",
    }),
});
