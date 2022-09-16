import { GetPostsFiltersDTO } from '@modules/posts/dto/GetPostsFiltersDTO'
import Posts from '@modules/posts/schemas/Posts'
import GetPostService from '@modules/posts/service/impl/GetPostService'
import Users from '@modules/users/schemas/Users'
import MongoMock from '@shared/mock/MongoMock'
import assert from 'assert'

describe('Test for get post service', () => {
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
    const getPostResponse = await new GetPostService().findPostByFilters(new GetPostsFiltersDTO())

    assert.notEqual(getPostResponse, null)
    assert.equal(getPostResponse.length, MAX_LIMIT_PER_PAGE)
  })

  it('Should return a list of post from page informed', async () => {
    const pagebleFilter = new GetPostsFiltersDTO()
    pagebleFilter.page = 2
    const getPostResponse = await new GetPostService().findPostByFilters(pagebleFilter)

    assert.notEqual(getPostResponse, null)
    assert.equal(getPostResponse.length, (await Posts.find({}).skip(10).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return a list of post by username', async () => {
    const userNameFilter = new GetPostsFiltersDTO()
    userNameFilter.userName = 'dummyUser'
    const getPostResponse = await new GetPostService().findPostByFilters(userNameFilter)

    assert.notEqual(getPostResponse, null)
    const existentUser = await Users.findOne({ user: userNameFilter.userName })
    assert.equal(getPostResponse.length, (await Posts.find({ user: existentUser }).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return a list of post with created date grater than informed', async () => {
    const startDateFilter = new GetPostsFiltersDTO()
    startDateFilter.startDate = '2022-09-16'

    const getPostResponse = await new GetPostService().findPostByFilters(startDateFilter)

    assert.notEqual(getPostResponse, null)
    assert.equal(getPostResponse.length, (await Posts.find({ createdAt: { $gte: new Date('2022-09-16') } }).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return a list of post with created date less than informed', async () => {
    const endDateFilter = new GetPostsFiltersDTO()
    endDateFilter.endDate = '2022-09-15'

    const getPostResponse = await new GetPostService().findPostByFilters(endDateFilter)

    assert.notEqual(getPostResponse, null)
    assert.equal(getPostResponse.length, (await Posts.find({ createdAt: { $lte: new Date('2022-09-15').setUTCHours(23, 59, 59, 999) } }).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return a list of post with created date between date informed', async () => {
    const betweenDateFilter = new GetPostsFiltersDTO()
    betweenDateFilter.startDate = '2022-09-14'
    betweenDateFilter.endDate = '2022-09-15'

    const getPostResponse = await new GetPostService().findPostByFilters(betweenDateFilter)

    assert.notEqual(getPostResponse, null)
    assert.equal(getPostResponse.length, (await Posts.find({ $and: [{ createdAt: { $gte: new Date('2022-09-14') } }, { createdAt: { $lte: new Date('2022-09-15').setUTCHours(23, 59, 59, 999) } }] }).limit(MAX_LIMIT_PER_PAGE)).length)
  })

  it('Should return a empty list when username not found', async () => {
    const userNameFilter = new GetPostsFiltersDTO()
    userNameFilter.userName = 'noDummyUser'
    const getPostResponse = await new GetPostService().findPostByFilters(userNameFilter)

    assert.notEqual(getPostResponse, null)
    const existentUser = await Users.findOne({ userName: userNameFilter.userName })

    assert.equal(getPostResponse.length, (await Posts.find({ user: existentUser }).limit(MAX_LIMIT_PER_PAGE)).length)
  })
})
