import { LoginParams } from "@/services/sessions-service";
import Joi from "joi";

export const loginSchema = Joi.object<LoginParams>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})