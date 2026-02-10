import { addAlbum, deleteAlbumsService, fetchAlbumById, fetchAllAlbumsWithArtists, updateAlbumsService } from '../services/albums.service.js'

const getAllAlbumsWithArtists = async (req, res, next) => {
    try {
        const data = await fetchAllAlbumsWithArtists()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
};

const getAlbumById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Album ID required' })
        }
        const data = await fetchAlbumById(id)
        if (!data) {
            throw ({ status: 404, message: 'Album not found' })
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const createAlbum = async (req, res, next) => {
    try {
        const data = req.body
        const result = await addAlbum(data)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
};

const updateAlbum = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Album ID required' })
        }
        const data = req.body
        if (!data) {
            throw { status: 400, message: 'Data invalid' }
        }
        const result = await updateAlbumsService(id, data)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

const deleteAlbum = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Album ID required' })
        }
        await deleteAlbumsService(id)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}
export { getAllAlbumsWithArtists, getAlbumById, createAlbum, updateAlbum, deleteAlbum }