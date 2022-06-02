import { Request, Response, NextFunction } from 'express'

import Author from '../models/Author'
import AuthorService from '../services/author'
import { BadRequestError, ForbiddenError } from '../helpers/apiError'

// GET /authors
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AuthorService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// POST /authors/create
export const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { firstName, lastName, birthYear, biography } = req.body

    const author = new Author({
      firstName,
      lastName,
      birthYear,
      biography,
    })

    const savedAuthor = await AuthorService.createAuthor(author)
    res.json({ author: savedAuthor })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /authors/:authorId/update
export const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const authorId = req.params.authorId
    const updatedAuthor = await AuthorService.updateAuthor(authorId, update)
    res.json(updatedAuthor)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /authors/:authorId/delete
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AuthorService.deleteAuthor(req.params.authorId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
