import userRepository from '@/repositories/user-repository';
import { user } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';

async function validateUniqueEmailOrFail(email: string) {
    const emailAlreadyExists = await userRepository.findByEmail(email);

    if (emailAlreadyExists) {
        throw duplicatedEmailError();
    }
}

export async function createUser({ email, password }: CreateUserParams) {

    await validateUniqueEmailOrFail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    return userRepository.userPost({
        email, password: hashedPassword
    })
}

export type CreateUserParams = Pick<user, 'email' | 'password'>;

const userService = {
    createUser,
}

export default userService;