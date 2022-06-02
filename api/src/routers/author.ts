import express from 'express'

import {
  findAll,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'
import verifyAuth from '../middlewares/verifyAuth'
import adminRequired from '../middlewares/adminRequired'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAll)

router.post('/create', verifyAuth, adminRequired, createAuthor)

router.put('/:authorId/update', verifyAuth, adminRequired, updateAuthor)

router.delete('/:authorId/delete', verifyAuth, adminRequired, deleteAuthor)

export default router
