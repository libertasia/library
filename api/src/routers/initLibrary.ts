import express from 'express'

import { populateDb } from '../controllers/initLibrary'

const router = express.Router()

router.get('/resetdb', populateDb)

export default router
