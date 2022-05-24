import express from 'express'

import {
  // createMovie,
  // findById,
  // deleteMovie,
  findAllPaginated,
  getBookCount,
  findBookById,
  // updateMovie,
} from '../controllers/book'

const router = express.Router()

// Every path we define here will get /api/v1/books prefix
router.get('/', findAllPaginated)
router.get('/count', getBookCount)
router.get('/:id', findBookById)

// router.get('/:movieId', findById)
// router.put('/:movieId', updateMovie)
// router.delete('/:movieId', deleteMovie)
// router.post('/', createMovie)

export default router
