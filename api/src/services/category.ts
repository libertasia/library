import Category, { CategoryDocument } from '../models/Category'

const findAll = async (): Promise<CategoryDocument[]> => {
  return Category.find().sort({ title: 1 })
}

const create = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  return category.save()
}

export default {
  findAll,
  create,
}
