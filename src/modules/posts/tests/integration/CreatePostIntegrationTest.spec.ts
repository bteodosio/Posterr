import App from '@infra/App'
import Posts from '@modules/posts/schemas/Posts'
import Users, { IUser } from '@modules/users/schemas/Users'
import MongoMock from '@shared/mock/MongoMock'
import assert from 'assert'
import supertest from 'supertest'

describe('Integration test for post creation service', () => {
  let savedUsers: IUser[]
  const app = new App(MongoMock).express
  beforeAll(async () => {
    await Posts.deleteMany({})
    await Users.deleteMany({})
    const users = [
      { userName: 'dummyUser' },
      { userName: 'otherDummyUser' },
      { userName: 'someDummyUser' }
    ]

    savedUsers = await Users.create(users)
  })

  afterAll(() => {
    MongoMock.disconnect()
  })

  it('Should create a new post when user is valid', async () => {
    const validPostRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: ''
    }
    const response = await supertest(app)
      .post('/posts')
      .send(validPostRequest)

    assert.notEqual(response, null)
    assert.equal(response.statusCode, 201)
    assert.notEqual(response.body.postCreated._id, null)
    assert.equal(response.body.postCreated.user, savedUsers[0]._id.toString())
    assert.equal(response.body.postCreated.postContent, validPostRequest.postContent)
  })

  it('Should create a new repost when user is valid', async () => {
    const validPostRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: ''
    }
    const response = await supertest(app)
      .post('/posts')
      .send(validPostRequest)

    const validRepostRequest = {
      userName: 'otherDummyUser',
      postContent: '',
      postId: response.body.postCreated._id
    }
    const repostResponse = await supertest(app)
      .post('/posts')
      .send(validRepostRequest)

    assert.notEqual(repostResponse, null)
    assert.equal(repostResponse.statusCode, 201)
    assert.notEqual(repostResponse.body.postCreated._id, null)
    assert.equal(repostResponse.body.postCreated.user, savedUsers[1]._id.toString())
    assert.equal(repostResponse.body.postCreated.postContent, '')
  })

  it('Should create a new quote repost when user is valid', async () => {
    const validPostRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: ''
    }
    const response = await supertest(app)
      .post('/posts')
      .send(validPostRequest)

    const validRepostRequest = {
      userName: 'otherDummyUser',
      postContent: 'This is a valid quote repost',
      postId: response.body.postCreated._id
    }
    const repostResponse = await supertest(app)
      .post('/posts')
      .send(validRepostRequest)

    assert.notEqual(repostResponse, null)
    assert.equal(repostResponse.statusCode, 201)
    assert.notEqual(repostResponse.body.postCreated._id, null)
    assert.equal(repostResponse.body.postCreated.user, savedUsers[1]._id.toString())
    assert.equal(repostResponse.body.postCreated.postContent, validRepostRequest.postContent)
  })

  it('Should return error description when user try to repost his own post', async () => {
    const validPostRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: ''
    }
    const response = await supertest(app)
      .post('/posts')
      .send(validPostRequest)

    const sameUserRepostRequest = {
      userName: 'dummyUser',
      postContent: '',
      postId: response.body.postCreated._id
    }
    const repostResponse = await supertest(app)
      .post('/posts')
      .send(sameUserRepostRequest)

    assert.notEqual(repostResponse, null)
    assert.equal(repostResponse.statusCode, 400)
    assert.notEqual(repostResponse.body, null)
    assert.equal(repostResponse.body.message, 'Wrong request')
    assert.equal(repostResponse.body.description, 'User cannot repost their own post')
  })

  it('Should return error description when user is invalid', async () => {
    const invalidUserRequest = {
      userName: 'invalid user',
      postContent: 'this is a valid post',
      postId: ''
    }
    const response = await supertest(app)
      .post('/posts')
      .send(invalidUserRequest)

    assert.notEqual(response, null)
    assert.equal(response.statusCode, 400)
    assert.notEqual(response.body, null)
    assert.equal(response.body.message, 'Wrong request')
    assert.equal(response.body.description, 'Invalid username')
  })

  it('Should return error description when user repost id is invalid', async () => {
    const invalidRepostIdRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: '63237d1500edff2d4507d27d'
    }
    const response = await supertest(app)
      .post('/posts')
      .send(invalidRepostIdRequest)

    assert.notEqual(response, null)
    assert.equal(response.statusCode, 400)
    assert.notEqual(response.body, null)
    assert.equal(response.body.message, 'Wrong request')
    assert.equal(response.body.description, 'Invalid post to be reposted')
  })

  it('Should return error description when user try to post more than limit post per day', async () => {
    const validPostRequest = {
      userName: 'dummyUser',
      postContent: 'this is a valid post',
      postId: ''
    }

    await supertest(app)
      .post('/posts')
      .send(validPostRequest)

    const overPostLimitrequest = {
      userName: 'dummyUser',
      postContent: '',
      postId: ''
    }
    const overLimitResponse = await supertest(app)
      .post('/posts')
      .send(overPostLimitrequest)

    assert.notEqual(overLimitResponse, null)
    assert.equal(overLimitResponse.statusCode, 400)
    assert.notEqual(overLimitResponse.body, null)
    assert.equal(overLimitResponse.body.message, 'Wrong request')
    assert.equal(overLimitResponse.body.description, 'Post creation limit reached')
  })

  it('Should return error description when unexpected error occur', async () => {
    const invalidRequest = {
      userName: 'someDummyUser',
      postContent: 'this is a valid post',
      postId: 'Invalid Post Id'
    }

    const invalidResponse = await supertest(app)
      .post('/posts')
      .send(invalidRequest)

    console.log(invalidResponse)

    assert.notEqual(invalidResponse, null)
    assert.equal(invalidResponse.statusCode, 500)
    assert.notEqual(invalidResponse.body, null)
    assert.equal(invalidResponse.body.message, 'Wrong request')
  })
})
