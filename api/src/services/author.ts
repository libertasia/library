import Author, { AuthorDocument } from '../models/Author'
import Book from '../models/Book'
import { ExpectationFailedError, NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<AuthorDocument[]> => {
  return Author.find()
  .populate('books', 'title publishedYear', Book)
  .sort({ firstName: 1 })
}

const findById = async (authorId: string): Promise<AuthorDocument> => {
  const foundAuthor = await Author.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const createAuthor = async (
  author: AuthorDocument
): Promise<AuthorDocument> => {
  return author.save()
}

const updateAuthor = async (
  authorId: string,
  update: Partial<AuthorDocument>
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findByIdAndUpdate(authorId, update, {
    new: true,
  })

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  return foundAuthor
}

const deleteAuthor = async (
  authorId: string
): Promise<AuthorDocument | null> => {
  const foundAuthor = await Author.findById(authorId)

  if (!foundAuthor) {
    throw new NotFoundError(`Author ${authorId} not found`)
  }

  if (foundAuthor.books.length > 0) {
    throw new ExpectationFailedError(
      `Author with books ${authorId} can't be deleted`
    )
  }

  return await foundAuthor.delete()
}

export default {
  findAll,
  findById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
}
