import express from 'express'

import { updateUser, getCurrentUser } from '../controllers/user'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix
router.get('/current', getCurrentUser)

router.put('/:userId/update', verifyAuth, updateUser)

export default router
