import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

import Book from '../models/Book'
import Author from '../models/Author'
import { BadRequestError } from '../helpers/apiError'

const authors = []

async function authorCreate(
  firstName: string,
  lastName: string,
  birthYear: number,
  biography: string
) {
  const authordetail = {
    firstName,
    lastName,
    birthYear,
    biography,
    books: [],
  }
  console.log(authordetail)

  const author = new Author(authordetail)

  const saved = await author.save()
  authors.push(saved)
  return saved
}

async function bookCreate(
  isbn: string,
  title: string,
  category: string,
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

    const authors = []
    for (let i = 0; i < 10; i++) {
      const name = `Author ${i}`
      const author = await authorCreate(
        name,
        'last name here',
        2000,
        'biography here'
      )
      authors.push(author)
    }
    for (let i = 0; i < 10; i++) {
      const title = `Book title ${i}`
      const isbn = `ISBN ${i}`
      const category = `Category ${i}`
      const desc = `Description ${i}`
      const publisher = `Publisher ${i}`
      const author1 = authors[randomIntFromInterval(0, authors.length - 1)]
      const bookAuthors = [author1._id]
      const publishedyear = randomIntFromInterval(1950, 2022)
      const numPages = randomIntFromInterval(50, 500)
      const statuses = ['AVAILABLE', 'BORROWED']
      const status = statuses[randomIntFromInterval(0, 1)]
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

    res.json([])
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
