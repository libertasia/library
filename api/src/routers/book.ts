import express from 'express'

import {
  findAllPaginated,
  getBookCount,
  findBookById,
  findBooks,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllPaginated)
router.get('/count', getBookCount)
router.get('/search', findBooks)
router.get('/:bookId', findBookById)

export default router
