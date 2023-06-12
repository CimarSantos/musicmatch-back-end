import authenticationService, { LoginParams } from "@/services/sessions-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function login(req: Request, res: Response) {

    const { email, password } = req.body as LoginParams;

    try {
        const loginResult = authenticationService.Login({ email, password });

        return res.status(httpStatus.OK).send(loginResult);
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send(error.message);
    }
}