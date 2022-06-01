import express from 'express'

import {
  findAllPaginated,
  getBookCount,
  findBookById,
  findBooks,
  borrowBook,
  returnBook,
  createBook,
  deleteBook,
  updateBook,
} from '../controllers/book'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllPaginated)
router.get('/count', getBookCount)
router.get('/search', findBooks)
router.get('/:bookId', findBookById)

router.post('/create', verifyAuth, createBook)
router.post('/:bookId/borrow', verifyAuth, borrowBook)
router.post('/:bookId/return', verifyAuth, returnBook)

router.put('/:bookId/update', verifyAuth, updateBook)

router.delete('/:bookId/delete', verifyAuth, deleteBook)

export default router
