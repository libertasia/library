import { Schema } from 'mongoose'

import Author from '../../src/models/Author'
import AuthorService from '../../src/services/author'
import connect, { MongodHelper } from '../db-helper'

const nonExistingAuthorId = '5e57b77b5744fa0b461c7906'

async function createAuthor(firstName: string, lastName: string, birthYear: number, biography: string, books?: [Schema.Types.ObjectId]) {
  const author = new Author({
    firstName,
    lastName,
    birthYear,
    biography,
    books
  })
  return await AuthorService.createAuthor(author)
}

describe('author service', () => {
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
    const author = await createAuthor('author1 FN', 'author1 LN', 1990, 'author1 biography')
    expect(author).toHaveProperty('_id')
    expect(author).toHaveProperty('firstName', 'author1 FN')
    expect(author).toHaveProperty('lastName', 'author1 LN')
    expect(author).toHaveProperty('birthYear', 1990)
    expect(author).toHaveProperty('biography', 'author1 biography')
  })

  it('should get all authors', async () => {
    const author1 = await createAuthor('author1 FN', 'author1 LN', 1990, 'author1 biography')
    const author2 = await createAuthor('author2 FN', 'author2 LN', 1991, 'author2 biography')
    const found = await AuthorService.findAll()
    expect(found.length).toEqual(2)
    expect(found[0]._id).toEqual(author1._id)
    expect(found[0].firstName).toEqual(author1.firstName)
  })

  it('should get an author with id', async () => {
    const author = await createAuthor('author1 FN', 'author1 LN', 1990, 'author1 biography')
    const found = await AuthorService.findById(author._id)
    expect(found.firstName).toEqual(author.firstName)
    expect(found._id).toEqual(author._id)
  })

  it('should not get a non-existing author', async () => {
    expect.assertions(1)
    return AuthorService.findById(nonExistingAuthorId).catch((e) => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })

  it('should update an existing author', async () => {
    const author = await createAuthor('author5 FN', 'author5 LN', 1990, 'author5 biography')
    const update = {
      firstName: 'First name updated',
      lastName: 'Last name updated',
    }
    const updated = await AuthorService.updateAuthor(author._id, update)
    expect(updated).toHaveProperty('_id', author._id)
    expect(updated).toHaveProperty('firstName', 'First name updated')
    expect(updated).toHaveProperty('lastName', 'Last name updated')
  })

  it('should not update a non-existing author', async () => {
    expect.assertions(1)
    const update = {
      name: 'Non-existing author first name',
      lastName: 'Non-existing author last name',
    }

    return AuthorService.updateAuthor(nonExistingAuthorId, update).catch((e) => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })

  it('should delete an existing author', async () => {
    expect.assertions(1)
    const author = await createAuthor('author6 FN', 'author6 LN', 1990, 'author6 biography')
    await AuthorService.deleteAuthor(author._id)
    return AuthorService.findById(author._id).catch((e) => {
      expect(e.message).toBe(`Author ${author._id} not found`)
    })
  })

  it('should not delete a non-existing author', async () => {
    expect.assertions(1)

    return AuthorService.deleteAuthor(nonExistingAuthorId).catch((e) => {
      expect(e.message).toMatch(`Author ${nonExistingAuthorId} not found`)
    })
  })
})


