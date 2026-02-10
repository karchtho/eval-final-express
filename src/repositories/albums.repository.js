import { prisma } from '../config/prisma.ts'

const findAllAlbumsWithArtists = async () => {
    return prisma.album.findMany(
        {
            include: { artist: true }
        }
    )
};

const findAlbumById = async (albumId) => {
    return prisma.album.findUnique({
        where: { id: albumId },
        include: { artist: true }
    })
};

const createAlbum = async (data) => {
    return prisma.album.create({
        data,
    })
};

const updateAlbum = async (albumId, data) => {
    return prisma.album.update({
        where: { id: albumId },
        data,
    })
}

const deleteAlbum = async (albumId) => {
    return prisma.album.delete({
        where: { id: albumId }
    })
};

export { findAllAlbumsWithArtists, findAlbumById, createAlbum, updateAlbum, deleteAlbum }