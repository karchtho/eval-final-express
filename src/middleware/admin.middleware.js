import { findUserByID } from "../repositories/user.repository"

const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = req.auth
        if (!userId) {
            throw {
                status: 400,
                message: 'Validation error, userID missing'
            }
        }
        const user = await findUserByID(userId)
        if (!user) {
            throw {
                status: 404,
                message: 'User not found'
            }
        }
        if (user.role !== 'ADMIN') {
            throw {
                status: 403,
                message: 'Admin role required'
            }
        }
        next()
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message || 'Role check error' })
    }
}

export { requireAdmin }