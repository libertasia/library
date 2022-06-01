import express from 'express'

import {
  findAll,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'
import verifyAuth from '../middlewares/verifyAuth'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAll)

router.post('/create', verifyAuth, createAuthor)

router.put('/:authorId/update', verifyAuth, updateAuthor)

router.delete('/:authorId/delete', verifyAuth, deleteAuthor)

export default router
