import { Router } from "express";
import { userPost } from "@/controllers/user-controller";
import { validateBody } from "@/middlewares";
import { userSchema } from "@/schemas";

const usersRouter = Router();

usersRouter.post('/', validateBody(userSchema), userPost);

export { usersRouter }
