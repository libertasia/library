import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

import Book from '../models/Book'
import Author, { AuthorDocument } from '../models/Author'
import { BadRequestError } from '../helpers/apiError'
import Category, { CategoryDocument } from '../models/Category'

// const authors = []
// const categories = []

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
  //authors.push(saved)
  return saved
}

async function categoryCreate(title: string) {
  const categoryDetail = {
    title,
  }

  const category = new Category(categoryDetail)
  console.log(category)

  const saved = await category.save()
  //categories.push(saved)
  return saved
}

async function bookCreate(
  isbn: string,
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
  console.log(bookdetail)

  const book = new Book(bookdetail)
  console.log(book)
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

    const authors: AuthorDocument[] = []
    const categories: CategoryDocument[] = []
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
    const categoriesTitles = [
      'Classics',
      'Detective',
      'Fantasy',
      'Romance',
      'Biography',
    ]
    for (let i = 0; i < categoriesTitles.length - 1; i++) {
      const categoryDoc = await categoryCreate(categoriesTitles[i])
      categories.push(categoryDoc)
    }
    for (let i = 0; i < 10; i++) {
      const title = `Book title ${i}`
      const isbn = `ISBN ${i}`
      const category =
        categories[randomIntFromInterval(0, categories.length - 1)]._id
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
