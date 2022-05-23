/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  isbn: string
  title: string
  category: string
  description: string
  publisher: string
  authors: mongoose.Types.ObjectId[]
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
    type: [mongoose.Types.ObjectId],
    index: true,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    index: true,
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
