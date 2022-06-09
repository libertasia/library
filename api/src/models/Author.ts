/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type AuthorDocument = Document & {
  firstName: string
  lastName: string
  birthYear: number
  biography: string
  books: string[]
}

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    index: true,
    required: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    index: true,
    required: true,
    maxLength: 50,
  },
  birthYear: {
    type: Number,
    required: true,
  },
  biography: {
    type: String,
    required: true,
  },
  books: {
    type: [Schema.Types.ObjectId],
    ref: 'Book',
  },
})

// Virtual for author's full name
authorSchema
  .virtual('name')
  .get(function (this: { firstName: string; lastName: string }) {
    let fullname = ''
    if (this.firstName && this.lastName) {
      fullname = this.firstName + ' ' + this.lastName
    }
    if (!this.firstName || !this.lastName) {
      fullname = ''
    }
    return fullname
  })

export default mongoose.model<AuthorDocument>('Author', authorSchema)
