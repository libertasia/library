import Category, { CategoryDocument } from '../models/Category'
import { NotFoundError } from '../helpers/apiError'

const findAll = async (): Promise<CategoryDocument[]> => {
  return Category.find().sort({ title: 1 })
}

export default {
  findAll,
}
