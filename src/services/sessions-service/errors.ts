import { ApplicationError } from "@/protocols";

export function invalidCredentialsError(): ApplicationError {
    return {
        name: 'invalidCredentialsError',
        message: 'email or password is invalid',
    }
}