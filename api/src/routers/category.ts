import express from 'express'

import { findAll } from '../controllers/category'

const router = express.Router()

router.get('/', findAll)

export default router
