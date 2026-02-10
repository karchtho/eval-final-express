import { addPlaylist, fetchPlaylistById, fetchPlaylistByUserId, removePlaylist, updatePlaylistService } from "../services/playlists.service";

const getPlaylistsByUserId = async (req, res, next) => {
    try {
        const userId = req.auth.userId
        const data = await fetchPlaylistByUserId(userId)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const getPlaylistById = async (req, res, next) => {
    try {
        const playlistId = parseInt(req.params.id)
        if (!playlistId) {
            throw {
                status: 400,
                message: 'ID requis'
            }
        }
        const data = await fetchPlaylistById(playlistId)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
};

const updatePlaylistAlbum = async (req, res, next) => {
    try {
        const playlistId = parseInt(req.params.id)
        if (!playlistId) {
            throw {
                status: 400,
                message: 'ID requis'
            }
        }
        const albumId = req.body.albumId
        const data = {
            albumId,
            playlistId
        }
        const result = await updatePlaylistService(data)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const createPlaylist = async (req, res, next) => {
    try {
        const body = req.body
        const userId = req.auth.userId

        const data = {
            userId,
            ...body
        }
        const result = await addPlaylist(data)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
};

const deletePlaylist = async (req, res, next) => {
    try {
        const playlistId = parseInt(req.params.id)
        if (!playlistId) {
            throw {
                status: 400,
                message: 'ID requis'
            }
        }
        await removePlaylist(playlistId)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}

export { createPlaylist, getPlaylistsByUserId, getPlaylistById, updatePlaylistAlbum, deletePlaylist }