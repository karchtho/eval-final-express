import { Router } from 'express'
import { auth } from "../middleware/auth.middleware.js";
import { requireAdmin } from '../middleware/admin.middleware.js';
import { getAlbumById, getAllAlbumsWithArtists, createAlbum, deleteAlbum, updateAlbum } from '../controllers/albums.controller.js';
import { upload } from '../middleware/uploads.midleware.js';

const router = Router()

router.get('/', getAllAlbumsWithArtists)
router.get('/:id', getAlbumById)
router.post('/', auth, upload.single('coverUrl'), createAlbum)
router.put('/:id', auth, upload.single('coverUrl'), updateAlbum)
router.delete('/:id', auth, requireAdmin, deleteAlbum)

export default router