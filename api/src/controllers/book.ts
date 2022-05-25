import { Request, Response, NextFunction } from 'express'

import BookService from '../services/book'
import { BadRequestError } from '../helpers/apiError'

// GET /books
export const findAllPaginated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, perPage } = req.query as { [key: string]: string }
    res.json(await BookService.findAllPaginated(page, perPage))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/count
export const getBookCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.getBookCount())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/search?title=a
export const findBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, isbn, author, status, category } = req.query as {
      [key: string]: string
    }
    let categories: string[] = []
    let statuses: string[] = []
    if (category) {
      categories = category.split(',')
    }
    if (status) {
      statuses = status.split(',')
    }
    res.json(
      await BookService.findByQuery(title, author, isbn, statuses, categories)
    )
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /books/:id
export const findBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await BookService.findById(req.params.bookId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
