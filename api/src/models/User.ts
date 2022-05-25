/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export enum Role {
  User = 'USER',
  Admin = 'ADMIN',
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
    type: [Schema.Types.ObjectId],
    ref: 'Book',
  },
  role: {
    type: String,
    enum: Role,
    default: Role.User,
    required: true,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
