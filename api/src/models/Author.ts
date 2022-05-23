/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  birthYear: number
  info: string
  books: mongoose.Types.ObjectId[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthYear: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  books: {
    type: [mongoose.Types.ObjectId],
  },
})

export default mongoose.model<AuthorDocument>('Author', authorSchema)
