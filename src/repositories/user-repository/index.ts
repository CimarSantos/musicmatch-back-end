import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function userPost(data: Prisma.userUncheckedCreateInput) {
    return prisma.user.create({
        data,
    });
}

async function findByEmail(email: string, select?: Prisma.userSelect) {
    const params: Prisma.userFindUniqueArgs = {
        where: {
            email,
        },
    };
    if (select) {
        params.select = select;
    }

    return prisma.user.findUnique(params)
}

const userRepository = {
    userPost,
    findByEmail
}

export default userRepository;