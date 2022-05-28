import express from 'express'

import {
  findAll,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from '../controllers/author'

const router = express.Router()

// Every path we define here will get /api/v1/authors prefix
router.get('/', findAll)

router.post('/create', createAuthor)

router.put('/:authorId/update', updateAuthor)

router.delete('/:authorId/delete', deleteAuthor)

export default router
