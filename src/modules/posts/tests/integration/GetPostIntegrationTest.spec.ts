import App from '@infra/App'
import Posts from '@modules/posts/schemas/Posts'
import Users from '@modules/users/schemas/Users'
import MongoMock from '@shared/mock/MongoMock'
import assert from 'assert'
import supertest from 'supertest'

describe('Integration test for get post service', () => {
  const app = new App(MongoMock).express
  const MAX_LIMIT_PER_PAGE = 10

  beforeAll(async () => {
    MongoMock.connect()
    await Posts.deleteMany({})
    await Users.deleteMany({})
    await MongoMock.loadData()
  })

  afterAll(() => {
    MongoMock.disconnect()
  })

  it('Should return a list of post limited by max limit per page', async () => {
    const getResponse = await supertest(app)
      .get('/posts')

    assert.notEqual(getResponse, null)
    assert.equal(getResponse.statusCode, 200)
    assert.notEqual(getResponse.body, null)
    assert.equal(getResponse.body.length, MAX_LIMIT_PER_PAGE)
  })

  it('Should return a list of post from page requested', async () => {
    const getResponse = await supertest(app)
      .get('/posts')
      .query({ page: 2 })

    assert.notEqual(getResponse, null)
    assert.equal(getResponse.statusCode, 200)
    assert.notEqual(getResponse.body, null)

    assert.equal(getResponse.body.length, (await Posts.find({}).skip(10).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return error description when inform a invalid start date', async () => {
    const getResponse = await supertest(app)
      .get('/posts')
      .query({ startDate: 'abc' })

    assert.notEqual(getResponse, null)
    assert.equal(getResponse.statusCode, 400)
    assert.notEqual(getResponse.body, null)
    assert.equal(getResponse.body.description, 'Invalid start date')
  })

  it('Should return error description when inform a invalid end date', async () => {
    const getResponse = await supertest(app)
      .get('/posts')
      .query({ endDate: 'abc' })

    assert.notEqual(getResponse, null)
    assert.equal(getResponse.statusCode, 400)
    assert.notEqual(getResponse.body, null)
    assert.equal(getResponse.body.description, 'Invalid end date')
  })
})
