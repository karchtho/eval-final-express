import { createAlbum, deleteAlbum, findAlbumById, findAllAlbumsWithArtists, updateAlbum } from "../repositories/albums.repository";
import { findArtistById } from "../repositories/artists.repository";


const fetchAllAlbumsWithArtists = async () => {
    const data = await findAllAlbumsWithArtists()
    return data

};

const fetchAlbumById = async (albumId) => {
    const data = await findAlbumById(albumId)
    if (!data) {
        throw ({ status: 404, message: 'Album not found' })
    }
    return data
};

const addAlbum = async (data) => {
    const artist = await findArtistById(data.artistId)
    if (!artist) {
        throw { status: 404, message: 'Artist not found' }
    }
    const created = await createAlbum(data)
    if (!created) {
        throw ({ status: 500, message: 'Creation error' })
    }
    return created
}

const updateAlbumsService = async (albumId, data) => {
    const updated = await updateAlbum(albumId, data)
    return updated
};

const deleteAlbumsService = async (albumId) => {
    const deleted = await deleteAlbum(albumId)
    return deleted
}

export { fetchAllAlbumsWithArtists, fetchAlbumById, addAlbum, updateAlbumsService, deleteAlbumsService }