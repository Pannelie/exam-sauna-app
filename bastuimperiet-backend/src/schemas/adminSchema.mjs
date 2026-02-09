import Joi from "joi";
import { throwError } from "../utils/throwError.mjs";

export const adminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});
