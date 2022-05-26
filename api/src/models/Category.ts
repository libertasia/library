/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document, Schema } from 'mongoose'

export type CategoryDocument = Document & {
  title: string
}

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
})

export default mongoose.model<CategoryDocument>('Category', categorySchema)
