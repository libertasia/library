import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { ForbiddenError } from '../helpers/apiError'
import { Role } from '../models/User'

export default function adminRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user as { role: Role }
    const isAdmin = user.role === Role.ADMIN

    if (!isAdmin) {
      throw new ForbiddenError()
    }
    next()
  } catch (error) {
    console.log('error:', error)
    throw new ForbiddenError()
  }
}
