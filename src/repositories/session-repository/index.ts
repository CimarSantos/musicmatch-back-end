import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

export async function createSession(data: Prisma.sessionUncheckedCreateInput) {
    return prisma.session.create({
        data,
    });
}

const sessionRepository = {
    createSession
}

export default sessionRepository;