/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type User = {
  firstName: string
  lastName: string
  email: string
  userName: string
  borrowedBooks: string[]
  role: string
}

export type UserDocument = Document & User

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxLength: 100,
  },
  lastName: {
    type: String,
    maxLength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
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
