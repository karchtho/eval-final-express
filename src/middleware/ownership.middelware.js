import { findPlaylistById } from "../repositories/playlists.repository"
import { findUserByID } from "../repositories/user.repository"

const ownership = async (req, res, next) => {
    try {
        const playlistId = parseInt(req.params.id)
        const playlist = await findPlaylistById(playlistId)
        if (!playlist) {
            throw {
                status: 404,
                message: "Couldn't find playlist"
            }
        }
        const userId = req.auth.userId
        const user = await findUserByID(userId)
        if (!user) {
            throw {
                status: 404,
                message: "Couldn't find user"
            }
        }
        if (playlist.userId === userId || user.role === 'ADMIN') {
            next()
        } else {
            res.status(401).json({ message: 'Unauthorized, ownership or admin required' })
        }
    } catch (err) {
        next(err)
    }
}

export default ownership