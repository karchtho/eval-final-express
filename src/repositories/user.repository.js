import { prisma } from '../config/prisma.ts'

const createUser = async (userData) => {
    const {email, password, name, role} = userData
    const createdUser = await prisma.user.create({
        data: {
            email,
            password,
            name,
            role,
        }
    })
    return createdUser;
}

const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email }
    })
};

const findUserByID = async (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}

export { createUser, findUserByEmail, findUserByID }