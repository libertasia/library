import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

import Book from '../models/Book'
import Author, { AuthorDocument } from '../models/Author'
import User, { UserDocument } from '../models/User'
import Category, { CategoryDocument } from '../models/Category'
import { BadRequestError } from '../helpers/apiError'

import mockData from '../mockData'

async function authorCreate(
  firstName: string,
  lastName: string,
  birthYear: number,
  biography: string
) {
  const authorDetail = {
    firstName,
    lastName,
    birthYear,
    biography,
    books: [],
  }
  const author = new Author(authorDetail)

  const saved = await author.save()

  return saved
}

async function categoryCreate(title: string) {
  const categoryDetail = {
    title,
  }

  const category = new Category(categoryDetail)
  const saved = await category.save()

  return saved
}

async function bookCreate(
  isbn: number,
  title: string,
  category: Schema.Types.ObjectId,
  description: string,
  publisher: string,
  authors: Schema.Types.ObjectId[],
  publishedYear: number,
  numPage: number,
  status: string
) {
  const bookdetail = {
    isbn,
    title,
    category,
    description,
    publisher,
    authors,
    publishedYear,
    numPage,
    status,
  }
  const book = new Book(bookdetail)
  return await book.save()
}

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const populateDb = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Book.deleteMany()
    await Author.deleteMany()
    await Category.deleteMany()
    await User.deleteMany()

    const mockAuthors = mockData['authors']
    const mockBooks = mockData['books']
    const mockCategories = mockData['categories']

    const authors: AuthorDocument[] = []
    const categories: CategoryDocument[] = []

    for (let i = 0; i < mockAuthors.length; i++) {
      const mockAuthor = mockAuthors[i]
      const author = await authorCreate(
        mockAuthor['firstName'],
        mockAuthor['lastName'],
        mockAuthor['birthYear'],
        mockAuthor['biography']
      )
      authors.push(author)
    }

    const categoriesTitles = mockCategories
    for (let i = 0; i < categoriesTitles.length - 1; i++) {
      const categoryDoc = await categoryCreate(categoriesTitles[i])
      categories.push(categoryDoc)
    }

    for (let i = 0; i < mockBooks.length; i++) {
      const mockBook = mockBooks[i]

      const title = mockBook['title']
      const isbn = mockBook['isbn']
      const category = categories[randomIntFromInterval(0, categories.length - 1)]._id
      const desc = mockBook['description']
      const publisher = mockBook['publisher']
      const author1 = authors[randomIntFromInterval(0, authors.length - 1)]
      const bookAuthors = [author1._id]
      const publishedyear = mockBook['publishedYear']
      const numPages = mockBook['numPage']
      const status = 'AVAILABLE'
      const savedBook = await bookCreate(
        isbn,
        title,
        category,
        desc,
        publisher,
        bookAuthors,
        publishedyear,
        numPages,
        status
      )
      author1.books.push(savedBook._id)
      await author1.save()
    }

    res.json({message: 'Database was reset'})
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
