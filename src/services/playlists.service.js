import { createPlaylist, deletePlaylist, findPlaylistById, findPlaylistsByUserId, postAlbumPlaylist } from "../repositories/playlists.repository";

const fetchPlaylistByUserId = async (userId) => {
    const data = await findPlaylistsByUserId(userId)
    if (!data) {
        throw {
            status: 404,
            message: 'Playlist not found'
        }
    }
    return data
}

const fetchPlaylistById = async (playlistId) => {
    const data = await findPlaylistById(playlistId)
    return data
}

const updatePlaylistService = async (playlistId, data) => {
    const updated = await postAlbumPlaylist(playlistId, data)
    return updated
}

const addPlaylist = async (data) => {
    const created = await createPlaylist(data)
    return created
}

const removePlaylist = async (data) => {
    const created = await deletePlaylist(data)
    return created
}
export { addPlaylist, fetchPlaylistByUserId, fetchPlaylistById, updatePlaylistService, removePlaylist }