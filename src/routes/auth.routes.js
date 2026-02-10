import { Router } from 'express'
import { addUser, loginUser } from '../controllers/auth.controller'
import { auth } from "../middleware/auth.middleware.js";
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = Router()

router.post('/register', addUser)
router.post('/login', loginUser)
router.get('/', auth, requireAdmin, (req, res) => {
    res.json('Login test')
})

export default router