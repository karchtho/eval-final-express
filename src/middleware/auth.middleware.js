import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET

const auth = (req, res, next) => {
    try {
        const authHeaders = req.headers.authorization;
        if (!authHeaders) {
            throw new Error('Login required')
        }
        const token = authHeaders.split(" ")[1]
        if (!token) {
            throw new Error('Token required for authentication')
        }
        const decodedToken = jwt.verify(token, secret)
        
        req.auth = { userId: decodedToken.userId, name: decodedToken.name }
        next();
    } catch (err) {
        res.status(401).json({ message: "Erreur d'authentification" })
    }
}

export { auth }