import sessionRepository from "@/repositories/session-repository";
import { user } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { invalidCredentialsError } from "./errors";
import { exclude } from "@/utils/prisma.utils";
import userRepository from "@/repositories/user-repository";


async function Login(params: LoginParams): Promise<LoginResult> {

    const { email, password } = params;

    const user = await getUser(email);

    await validatePassword(password, user.password);

    const token = await createSession(user.id);

    return {
        user: exclude(user, 'password'),
        token,
    };
}

async function getUser(email: string): Promise<getUserResult> {

    const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
    if (!user) throw invalidCredentialsError();

    return user;
}

async function createSession(user_id: number) {
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET);
    await sessionRepository.createSession({
        token, user_id,
    })

    return token;
}

async function validatePassword(password: string, userPassword: string) {
    const validPassword = await bcrypt.compare(password, userPassword);

    if (!validPassword) throw invalidCredentialsError();
}

export type LoginParams = Pick<user, 'email' | 'password'>;

type LoginResult = {
    user: Pick<user, 'id' | 'email'>;
    token: string;
}

type getUserResult = Pick<user, 'id' | 'email' | 'password'>;

const authenticationService = {
    Login,
}

export default authenticationService; 