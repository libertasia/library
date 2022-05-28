/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  userName: string
  password: string
  borrowedBooks: string[]
  role: string
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
  borrowedBooks: {
    type: [Schema.Types.ObjectId],
    ref: 'Book',
  },
  role: {
    type: String,
    enum: Role,
    default: Role.USER,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
