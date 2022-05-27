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

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllPaginated)
router.get('/count', getBookCount)
router.get('/search', findBooks)
router.get('/:bookId', findBookById)

router.post('/create', createBook)
router.post('/:bookId/borrow', borrowBook)
router.post('/:bookId/return', returnBook)

router.put('/:bookId/update', updateBook)

router.delete('/:bookId/delete', deleteBook)

export default router
