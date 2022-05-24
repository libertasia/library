/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  category: string
  description: string
  publisher: string
  authors: string[]
  publishedYear: number
  status: string
  borrowerId: string
  borrowDate: Date
  returnDate: Date
}

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    index: true,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    index: true,
    required: true,
  },
  category: {
    type: String,
    index: true,
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
    type: [Schema.Types.ObjectId],
    ref: 'Author',
    index: true,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'BORROWED'],
    default: 'AVAILABLE',
    index: true,
    required: true,
  },
  borrowerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowDate: {
    type: Date,
  },
  returnDate: {
    type: Date,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
