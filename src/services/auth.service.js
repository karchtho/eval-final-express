import { findUserByEmail, createUser } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET

const registerUser = async (userData) => {
    const { email, password } = userData

    const user = await findUserByEmail(email)
    if (user) {
        throw {
            status: 409,
            message: "User already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        ...userData,
        password: hashedPassword,
    }

    return await createUser(newUser)
}

const loginService = async (email, password) => {

    const user = await findUserByEmail(email)

    if (!user) {
        throw new Error('Getting user error')
    }
    console.log("database: ", user.password, "contr : ", password);
    const isVerifiy = await bcrypt.compare(password, user.password )
    console.log("service 36", isVerifiy);

    if (!isVerifiy) {
        throw { status: 401, message: 'Non autorisé' }
    }


    const token = jwt.sign({ userId: user.id, name: user.name }, secret, { expiresIn: '24h' })

    return {token}
};

export { registerUser, loginService }