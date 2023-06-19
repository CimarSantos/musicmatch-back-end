import { login } from "@/controllers/authentication-controller";
import { validateBody } from "@/middlewares";
import { loginSchema } from "@/schemas/authentication-schemas";
import { Router } from "express";

const authenticationRouter = Router();

authenticationRouter.post('/', validateBody(loginSchema), login);

export { authenticationRouter };