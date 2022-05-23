/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  userName: string
  password: string
  borrowedBooks: mongoose.Types.ObjectId[]
  isAdmin: boolean
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  borrowedBooks: {
    type: [mongoose.Types.ObjectId],
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
