import express from 'express'

import { findAll } from '../controllers/category'

const router = express.Router()

// Every path we define here will get /api/v1/categories prefix
router.get('/', findAll)

export default router
