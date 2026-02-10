import { prisma } from '../config/prisma.ts'

const findAllArtistsWithAlbums = async () => {
    return prisma.artist.findMany(
        {
            include: { album: true }
        }
    )
};

const findArtistById = async (artistId) => {
    return prisma.artist.findUnique({
        where: { id: artistId },
        include: { album: true }
    })
};

const createArtist = async (data) => {
    return prisma.artist.create({
        data,
    })
};

const updateArtist = async (artistId, data) => {
    return prisma.artist.update({
        where: { id: artistId },
        data,
    })
}

const deleteArtist = async (artistId) => {
    return prisma.artist.delete({
        where: { id: artistId }
    })
};

export { findAllArtistsWithAlbums, findArtistById, createArtist, updateArtist, deleteArtist }