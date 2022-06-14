import request from 'supertest'

import Category, { CategoryDocument } from '../../src/models/Category'
import CategoryService from '../../src/services/category'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

async function createCategory(title: string) {
  const category = new Category({
    title
  })
  return await CategoryService.create(category)
}

describe('category controller', () => {
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

  it('should get back all categories', async () => {
    const res1 = await createCategory('Category1')
    const res2 = await createCategory('Category2')

    const res3 = await request(app).get('/api/v1/categories')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1._id.toString())
    expect(res3.body[1]._id).toEqual(res2._id.toString())
  })
})
