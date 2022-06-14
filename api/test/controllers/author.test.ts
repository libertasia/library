import request from 'supertest'
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../src/util/secrets'
import { AuthorDocument } from '../../src/models/Author'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor(override?: Partial<AuthorDocument>) {
  let author = {
    firstName: 'author1 FN',
    lastName: 'author1 LN',
    birthYear: 1990,
    biography: 'author1 biography',
  }

  if (override) {
    author = { ...author, ...override }
  }

  const token = jwt.sign({ email: 'testuser@testdomain.com', role: 'ADMIN' }, JWT_SECRET, {
    expiresIn: '1h',
  })

  return await request(app)
    .post('/api/v1/authors/create')
    .set('Cookie', [`token=${token}`])
    .send(author)
}

describe('author controller', () => {
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

  it('should create an author', async () => {
    const res = await createAuthor()
    expect(res.status).toBe(200)
    expect(res.body.author).toHaveProperty('_id')
    expect(res.body.author.firstName).toBe('author1 FN')
  })

  it('should get back an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body._id
    res = await request(app).get(`/api/v1/authors/${authorId}`)

    expect(res.body._id).toEqual(authorId)
  })

  it('should not get back a non-existing author', async () => {
    const res = await request(app).get(`/api/v1/authors/${nonExistingAuthorId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all authors', async () => {
    const res1 = await createAuthor({
      firstName: 'Author 1',
      lastName: 'Author 1 last name',
    })
    const res2 = await createAuthor({
      firstName: 'Author 2',
      lastName: 'Author 2 last name',
    })

    const res3 = await request(app).get('/api/v1/authors')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body.author._id)
    expect(res3.body[1]._id).toEqual(res2.body.author._id)
  })

  it('should update an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)

    const authorId = res.body.author._id
    const update = {
      firstName: 'Updated first name',
      lastName: 'Updated last name',
    }

    const token = jwt.sign({ email: 'testuser@testdomain.com', role: 'ADMIN' }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res = await request(app)
    .put(`/api/v1/authors/${authorId}/update`)
    .set('Cookie', [`token=${token}`])
    .send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('Updated first name')
    expect(res.body.lastName).toEqual('Updated last name')
  })

  it('should delete an existing author', async () => {
    let res = await createAuthor()
    expect(res.status).toBe(200)
    const authorId = res.body.author._id

    const token = jwt.sign({ email: 'testuser@testdomain.com', role: 'ADMIN' }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res = await request(app)
    .delete(`/api/v1/authors/${authorId}/delete`)
    .set('Cookie', [`token=${token}`])

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/authors/${authorId}/delete`)
    expect(res.status).toBe(404)
  })
})
