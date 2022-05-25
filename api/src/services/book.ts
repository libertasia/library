import Book, { BookDocument } from '../models/Book'
import Author from '../models/Author'
import { NotFoundError } from '../helpers/apiError'
import mongoose from 'mongoose'

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find()
    .populate('authors', 'firstName lastName')
    .sort({ title: 1, publishedYear: -1 })
}

const getBookCount = async (): Promise<number> => {
  return Book.countDocuments()
}

const findAllPaginated = async (
  pageNum: string,
  perPageCount: string
): Promise<BookDocument[]> => {
  const page = parseInt(pageNum) || 1
  const perPage = parseInt(perPageCount) || 10
  return Book.find()
    .populate('authors', 'firstName lastName')
    .limit(perPage)
    .skip(perPage * (page - 1))
    .sort({ title: 1, publishedYear: -1 })
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId).populate(
    'authors',
    'firstName lastName'
  )

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  return foundBook
}

const findByTitle = async (titleQuery: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({
    title: { $regex: `${titleQuery}`, $options: 'i' },
  })
    .populate('authors', 'firstName lastName')
    .sort({ title: 1, publishedYear: -1 })
  return foundBooks
}

const findByIsbn = async (isbnQuery: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({
    isbn: { $regex: `${isbnQuery}`, $options: 'i' },
  })
    .populate('authors', 'firstName lastName')
    .sort({ title: 1, publishedYear: -1 })
  return foundBooks
}

const findByAuthor = async (authorQuery: string): Promise<BookDocument[]> => {
  const foundAuthors = await Author.find({
    $or: [
      {
        firstName: { $regex: `${authorQuery}`, $options: 'i' },
      },
      {
        lastName: { $regex: `${authorQuery}`, $options: 'i' },
      },
    ],
  })
  const authorIds = foundAuthors.map((authorDoc) => authorDoc._id)
  const foundBooks = Book.find({
    authors: { $in: authorIds },
  }).populate('authors', 'firstName lastName')
  return foundBooks
}

const findByQuery = async (
  title: string,
  author: string,
  isbn: string,
  statuses: string[],
  categories: string[]
): Promise<BookDocument[]> => {
  const query = Book.find()
  let titleQuery = {}
  let authorQuery = {}
  let isbnQuery = {}
  let statusQuery = {}
  let categoryQuery = {}
  const andArray: any[] = []

  if (title) {
    titleQuery = { title: { $regex: `${title}`, $options: 'i' } }
    andArray.push(titleQuery)
  }
  if (author) {
    const foundAuthors = await Author.find({
      $or: [
        {
          firstName: { $regex: `${author}`, $options: 'i' },
        },
        {
          lastName: { $regex: `${author}`, $options: 'i' },
        },
      ],
    })
    const authorIds = foundAuthors.map((authorDoc) => authorDoc._id)
    authorQuery = { authors: { $in: authorIds } }
    andArray.push(authorQuery)
  }
  if (isbn) {
    isbnQuery = { isbn: { $regex: `${isbn}`, $options: 'i' } }
    andArray.push(isbnQuery)
  }
  if (statuses && statuses.length > 0) {
    statusQuery = {
      $or: statuses.map((statusElem) => {
        return { status: { $regex: `${statusElem}`, $options: 'i' } }
      }),
    }
    andArray.push(statusQuery)
  }
  if (categories && categories.length > 0) {
    categoryQuery = {
      $or: categories.map((categoryElem) => {
        return { category: { $regex: `${categoryElem}`, $options: 'i' } }
      }),
    }
    andArray.push(categoryQuery)
  }
  const foundBooks = await query
    .and(andArray)
    .populate('authors', 'firstName lastName')
  return foundBooks
}

export default {
  findAll,
  getBookCount,
  findAllPaginated,
  findById,
  findByTitle,
  findByIsbn,
  findByAuthor,
  findByQuery,
}
