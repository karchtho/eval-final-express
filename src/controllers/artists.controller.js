import { addArtist, deleteArtistService, fetchAllArtistsWithAlbums, fetchArtistById, updateArtistsService } from '../services/artists.service.js'

const getAllArtistsWithAlbums = async (req, res, next) => {
    try {
        const data = await fetchAllArtistsWithAlbums()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
};

const getArtistById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Artist ID required' })
        }
        const data = await fetchArtistById(id)
        if (!data) {
            throw ({ status: 404, message: 'Artist not found' })
        }
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

const createArtist = async (req, res, next) => {
    try {
        const data = req.body
        if(req.file) {
            data.photoUrl = req.file.path
        }
        const result = await addArtist(data)

        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
};

const updateArtist = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Artist ID required' })
        }
        const data = req.body
        if (!data) {
            throw { status: 400, message: 'Data invalid' }
        }
        const result = await updateArtistsService(id, data)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}

const deleteArtist = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            throw ({ status: 400, message: 'Artist ID required' })
        }
        await deleteArtistService(id)
        res.sendStatus(204)
    } catch (err) {
        next(err)
    }
}
export { getAllArtistsWithAlbums, getArtistById, createArtist, updateArtist, deleteArtist }