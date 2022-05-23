/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  description: string
  publisher: string
  authors: string[]
  publishedDate: Date
  status: string
  borrowerId: mongoose.Types.ObjectId
  borrowDate: Date
  returnDate: Date
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    index: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  borrowerId: {
    type: mongoose.Types.ObjectId,
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
