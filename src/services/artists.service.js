import { createArtist, deleteArtist, findAllArtistsWithAlbums, findArtistById, updateArtist } from "../repositories/artists.repository";

const fetchAllArtistsWithAlbums = async () => {
    const data = await findAllArtistsWithAlbums()
    return data

};

const fetchArtistById = async (artistId) => {
    const data = await findArtistById(artistId)
    if (!data) {
        throw ({ status: 404, message: 'Artist not found' })
    }
    return data
};

const addArtist = async (data) => {
    const created = await createArtist(data)
    return created
}

const updateArtistsService = async (artistId, data) => {
    const updated = await updateArtist(artistId, data)
    return updated
};

const deleteArtistService = async (artistId) => {
    const deleted = await deleteArtist(artistId)
    return deleted
}

export { fetchAllArtistsWithAlbums, fetchArtistById, addArtist, updateArtistsService, deleteArtistService }