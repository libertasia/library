import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// import User from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import { Role, User } from '../models/User'

// PUT /users/:userId/update
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const userId = req.params.userId
    const updatedUser = await UserService.update(userId, update)
    res.json(updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/current
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET as string
    const token = req.cookies.token
    if (!token) {
      res.json({})
      return
    }
    const user = jwt.verify(token, JWT_SECRET) as User
    const currentUser = await UserService.findOne(user.email)
    res.json(currentUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
