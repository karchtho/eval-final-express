import { registerUser, loginService } from "../services/auth.service";

const addUser = async (req, res) => {
    const userData = req.body
    const { email, password } = userData
    try {
        if (!email) {
            throw new Error("Email required")
        }
        if (!password) {
            throw new Error("Password required")
        }
        const result = await registerUser(userData)
        if (!result) {
            throw new Error('Création error')
        }
        res.status(201).json({ message: "User created" })
    } catch (err) {
        res.status(err.status || 500).send({ message: err.message })
    }
};

const loginUser = async (req, res) => {
    try {
        const userData = req.body
        if (!userData) {
            throw new Error('Missing data')
        }

        const { email, password } = userData

        if (!email) {
            throw new Error("Email required")
        }
        if (!password) {
            throw new Error("Password required")
        }
        console.log('authcontr 38', password);
        const result = await loginService(email, password)
        if (!result) {
            throw new Error('Login Error')
        }
        console.log("authcontr43", result.token);
        const token = result.token
        res.status(200).json({message: 'Login successful', token})
    } catch (err) {
        res.status(err.status || 500).json({message: err.message})
    }
};

export { addUser, loginUser }