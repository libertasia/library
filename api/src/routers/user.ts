import express from 'express'

import { signUpUser, updateUser } from '../controllers/user'

const router = express.Router()

// Every path we define here will get /api/v1/users prefix

router.post('/signup', signUpUser)

router.put('/:userId/update', updateUser)

export default router
