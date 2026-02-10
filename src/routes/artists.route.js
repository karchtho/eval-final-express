import { Router } from 'express'
import { auth } from "../middleware/auth.middleware.js";
import { requireAdmin } from '../middleware/admin.middleware.js';
import { createArtist, deleteArtist, getAllArtistsWithAlbums, getArtistById, updateArtist } from '../controllers/artists.controller.js';
import { upload } from '../middleware/uploads.midleware.js';

const router = Router()

router.get('/', getAllArtistsWithAlbums)
router.get('/:id', getArtistById)
router.post('/', auth, requireAdmin, upload.single('photoUrl'), createArtist)
router.put('/:id', auth, requireAdmin, upload.single('photoUrl'), updateArtist)
router.delete('/:id', auth, requireAdmin, deleteArtist)

export default router