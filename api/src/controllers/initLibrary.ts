import { Request, Response, NextFunction } from 'express'
import { Schema } from 'mongoose'

import Book from '../models/Book'
import Author, { AuthorDocument } from '../models/Author'
import User, { UserDocument } from '../models/User'
import Category, { CategoryDocument } from '../models/Category'
import { BadRequestError } from '../helpers/apiError'

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
  console.log(authorDetail)

  const author = new Author(authorDetail)

  const saved = await author.save()

  return saved
}

async function categoryCreate(title: string) {
  const categoryDetail = {
    title,
  }

  const category = new Category(categoryDetail)
  console.log(category)

  const saved = await category.save()

  return saved
}

async function userCreate(
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password: string,
  role: string
) {
  const userDetail = {
    firstName,
    lastName,
    email,
    userName,
    password,
    borrowedBooks: [],
    role,
  }
  console.log(userDetail)

  const user = new User(userDetail)

  const saved = await user.save()

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
    await User.deleteMany()

    const authors: AuthorDocument[] = []
    const categories: CategoryDocument[] = []
    const users: UserDocument[] = []

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
    for (let i = 0; i < 2; i++) {
      const firstName = `User ${i} firstname`
      const lastName = `User ${i} lastname`
      const email = `User ${i} email`
      const userName = `User ${i} username`
      const password = `User ${i} password`
      const roles = ['USER', 'ADMIN']
      const role = roles[i]
      const userDoc = await userCreate(
        firstName,
        lastName,
        email,
        userName,
        password,
        role
      )
      users.push(userDoc)
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
