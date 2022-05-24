import Book, { BookDocument } from '../models/Book'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find().sort({ title: 1, publishedYear: -1 })
}

const getBookCount = async (): Promise<number> => {
  return Book.count()
}

const findAllPaginated = async (
  pageNum: string,
  perPageCount: string
): Promise<BookDocument[]> => {
  const page = parseInt(pageNum) || 1
  const perPage = parseInt(perPageCount) || 10
  return Book.find()
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({ title: 1, publishedYear: -1 })
}

export default {
  findAll,
  getBookCount,
  findAllPaginated,
}
