import { Router } from 'express'
import { auth } from "../middleware/auth.middleware.js";
import ownership from '../middleware/ownership.middelware.js'
import { createPlaylist, deletePlaylist, getPlaylistById, getPlaylistsByUserId, updatePlaylistAlbum } from '../controllers/playlists.controller.js';

const router = Router()

router.post('/', auth, createPlaylist)
router.get('/me', auth, getPlaylistsByUserId)
router.get('/:id', getPlaylistById)
router.put('/:id', auth, ownership)
router.delete('/:id', auth, ownership, deletePlaylist)
router.post('/:id/albums', auth, ownership, updatePlaylistAlbum)
router.delete('/:id/albums/:albumId', auth, ownership)


export default router