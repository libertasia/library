import Book, { BookDocument, Status } from '../models/Book'
import User from '../models/User'
import Author from '../models/Author'
import Category from '../models/Category'
import { ExpectationFailedError, NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<BookDocument[]> => {
  return Book.find()
    .populate('authors', 'firstName lastName')
    .populate('category')
    .sort({ title: 1, publishedYear: -1 })
}

const getBookCount = async (): Promise<number> => {
  return Book.countDocuments()
}

const findAllPaginated = async (
  pageNum: string,
  perPageCount: string
): Promise<BookDocument[]> => {
  const page = parseInt(pageNum) || 0
  const perPage = parseInt(perPageCount) || 10
  return Book.find()
    .populate('authors', 'firstName lastName')
    .populate('category')
    .limit(perPage)
    .skip(perPage * page)
    .sort({ title: 1, publishedYear: -1 })
}

const findById = async (bookId: string): Promise<BookDocument> => {
  const foundBook = await Book.findById(bookId)
    .populate('authors', 'firstName lastName')
    .populate('category')

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
    .populate('category')
    .sort({ title: 1, publishedYear: -1 })
  return foundBooks
}

const findByIsbn = async (isbnQuery: string): Promise<BookDocument[]> => {
  const foundBooks = await Book.find({
    isbn: { $regex: `${isbnQuery}`, $options: 'i' },
  })
    .populate('authors', 'firstName lastName')
    .populate('category')
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
  })
    .populate('authors', 'firstName lastName')
    .populate('category')
  return foundBooks
}

const findByQuery = async (
  title: string,
  author: string,
  isbn: string,
  statuses: string[],
  categories: string[]
): Promise<BookDocument[]> => {
  let query = Book.find()
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
    const regexArray = categories.map((name) => new RegExp(name, 'i'))
    const foundCategories = await Category.find({ title: { $in: regexArray } })
    const categoriesIds = foundCategories.map((catDoc) => catDoc._id)
    categoryQuery = { category: { $in: categoriesIds } }
    andArray.push(categoryQuery)
  }
  if (andArray.length > 0) {
    query = query.and(andArray)
  }

  const foundBooks = await query
    .populate('authors', 'firstName lastName')
    .populate('category')
  return foundBooks
}

const borrowBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const currentDate = new Date()
  const loanDurationDays = 7
  const returnDate = new Date(
    currentDate.setDate(currentDate.getDate() + loanDurationDays)
  )
  const bookUpdate = {
    status: Status.BORROWED,
    borrowerId: userId,
    borrowDate: new Date(),
    returnDate,
  }
  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  if (foundUser.borrowedBooks.indexOf(bookId) == -1) {
    foundUser.borrowedBooks.push(bookId)
    await foundUser.save()
  }

  return foundBook
}

const returnBook = async (
  bookId: string,
  userId: string
): Promise<BookDocument | null> => {
  const bookUpdate = {
    $set: {
      status: Status.AVAILABLE,
    },
    $unset: {
      borrowerId: null,
      borrowDate: null,
      returnDate: null,
    },
  }
  const foundBook = await Book.findByIdAndUpdate(bookId, bookUpdate, {
    new: true,
  })
  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  const foundUser = await User.findById(userId)
  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }
  if (foundUser.borrowedBooks.indexOf(bookId) != -1) {
    foundUser.borrowedBooks = foundUser.borrowedBooks.filter(
      (book) => book != bookId
    )
    await foundUser.save()
  }
  return foundBook
}

const createBook = async (book: BookDocument): Promise<BookDocument> => {
  const newBook = await book.save()
  for (let i = 0; i < newBook.authors.length; i++) {
    const authorId = newBook.authors[i]
    const foundAuthor = await Author.findById(authorId)
    if (!foundAuthor) {
      throw new NotFoundError(`Author ${authorId} not found`)
    }
    foundAuthor.books.push(newBook._id)
    await foundAuthor.save()
  }
  return newBook
}

const updateBook = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  const originalBook = await Book.findById(bookId)
  if (!originalBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }
  const updatedBook = await Book.findByIdAndUpdate(bookId, update, {
    new: true,
  })
  if (!updatedBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  // if author was removed, we need to remove this book from author's list of books
  for (let i = 0; i < originalBook.authors.length; i++) {
    const originalAuthorId = originalBook.authors[i]
    if (updatedBook.authors.indexOf(originalAuthorId) == -1) {
      const originalAuthor = await Author.findById(originalAuthorId)
      if (!originalAuthor) {
        throw new NotFoundError(`Author ${originalAuthorId} not found`)
      }
      originalAuthor.books = originalAuthor.books.filter(
        (book) => book != bookId
      )
      await originalAuthor.save()
    }
  }

  // make sure all book authors have this book in their list
  for (let i = 0; i < updatedBook.authors.length; i++) {
    const updatedAuthorId = updatedBook.authors[i]
    const updatedAuthor = await Author.findById(updatedAuthorId)
    if (!updatedAuthor) {
      throw new NotFoundError(`Author ${updatedAuthorId} not found`)
    }
    if (updatedAuthor.books.indexOf(bookId) == -1) {
      updatedAuthor.books.push(bookId)
      await updatedAuthor.save()
    }
  }

  return updatedBook
}

const deleteBook = async (bookId: string): Promise<BookDocument | null> => {
  const foundBook = await Book.findById(bookId)

  if (!foundBook) {
    throw new NotFoundError(`Book ${bookId} not found`)
  }

  if (foundBook.status === Status.BORROWED) {
    throw new ExpectationFailedError(`Borrowed Book ${bookId} can't be deleted`)
  }

  for (let i = 0; i < foundBook.authors.length; i++) {
    const authorId = foundBook.authors[i]
    const foundAuthor = await Author.findById(authorId)
    if (!foundAuthor) {
      throw new NotFoundError(`Author ${authorId} not found`)
    }
    foundAuthor.books = foundAuthor.books.filter((book) => book != bookId)
    await foundAuthor.save()
  }

  return await foundBook.delete()
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
  borrowBook,
  returnBook,
  createBook,
  deleteBook,
  updateBook,
}
