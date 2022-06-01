import express from 'express'

import { updateUser } from '../controllers/user'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.put('/:userId/update', verifyAuth, updateUser)

export default router
