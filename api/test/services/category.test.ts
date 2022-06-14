import Category from '../../src/models/Category'
import CategoryService from '../../src/services/category'
import connect, { MongodHelper } from '../db-helper'

async function createCategory() {
  const category = new Category({
    title: 'category1',

  })
  return await CategoryService.create(category)
}

describe('category service', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a category', async () => {
    const category = await createCategory()
    expect(category).toHaveProperty('_id')
    expect(category).toHaveProperty('title', 'category1')
  })

  it('should get all categories', async () => {
    const category = await createCategory()
    const found = await CategoryService.findAll()
    expect(found[0]._id).toEqual(category._id)
    expect(found[0].title).toEqual(category.title)
  })
})
