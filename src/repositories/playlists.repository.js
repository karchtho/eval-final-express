import { prisma } from '../config/prisma.ts'


const findPlaylistsByUserId = async (userId) => {
    return prisma.playlist.findMany({
        where: { userId }
    })
};

const findPlaylistById = async (playlistId) => {
    return prisma.playlist.findUnique({
        where: { id: playlistId }
    })
};

const postAlbumPlaylist = async (playlistId, data) => {
    return prisma.playlist.update({
        where: { id: playlistId },
        data
    })
};

const createPlaylist = async (data) => {
    return prisma.playlist.create({
        data,
    })
};

const deletePlaylist = async (playlistId) => {
    return prisma.playlist.delete({
        where: { id: playlistId }
    })
}

export { findPlaylistsByUserId, createPlaylist, findPlaylistById, postAlbumPlaylist, deletePlaylist }