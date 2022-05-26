import { Request, Response, NextFunction } from 'express'

import CategoryService from '../services/category'
import { BadRequestError } from '../helpers/apiError'

// GET /categories
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CategoryService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
