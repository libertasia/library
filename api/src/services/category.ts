import Category, { CategoryDocument } from '../models/Category'

const findAll = async (): Promise<CategoryDocument[]> => {
  return Category.find().sort({ title: 1 })
}

export default {
  findAll,
}
