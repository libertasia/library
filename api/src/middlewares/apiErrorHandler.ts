import { Request, Response, NextFunction } from 'express'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

export default function(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(`ERROR: ${error}`)
  if (error.source) {
    logger.error(error.source)
  }
  if (error.statusCode) {
    res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    })
  }
  else {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: `ERROR: ${error}`,
    })
  }
}
