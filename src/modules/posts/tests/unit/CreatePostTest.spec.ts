import { PostsRequestDTO } from '@modules/posts/dto/PostsRequestDTO'
import { PostsRepositoryImpl } from '@modules/posts/repository/impl/PostsRepositoryImpl'
import Posts from '@modules/posts/schemas/Posts'
import { CreatePostService } from '@modules/posts/service/impl/CreatePostService'
import { UserRepositoryImpl } from '@modules/users/repository/impl/UserRepository'
import Users, { IUser } from '@modules/users/schemas/Users'
import { ErrorHandler } from '@shared/common/ErrorHandler'
import MongoMock from '@shared/mock/MongoMock'
import assert from 'assert'
import mongoose from 'mongoose'

describe('Test for create post service', () => {
  const validUsers = [
    { userName: 'dummyUser' },
    { userName: 'otherDummyUser' }
  ]
  let savedUsers: IUser[]

  const postsRepositoryImpl = new PostsRepositoryImpl()
  const userRepositoryImpl = new UserRepositoryImpl()
  const createPostService = new CreatePostService(userRepositoryImpl, postsRepositoryImpl)

  beforeAll(async () => {
    MongoMock.connect()
    await Posts.deleteMany({})
    await Users.deleteMany({})
    savedUsers = await Users.create(validUsers)
  })

  afterAll(() => {
    MongoMock.disconnect()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('Should create a new post when username is valid', async () => {
    const validPostCreationRequest = new PostsRequestDTO()
    validPostCreationRequest.userName = validUsers[0].userName
    validPostCreationRequest.postContent = 'This is a valid post'

    const serviceResponse = await createPostService.execute(validPostCreationRequest)

    assert.notEqual(serviceResponse, null)
    assert.equal(serviceResponse.postCreated.user, savedUsers[0]._id.toString())
    assert.equal(serviceResponse.postCreated.postContent, validPostCreationRequest.postContent)
    assert.equal(serviceResponse.postCreated.repostedPost, null)
  })

  it('Should create a new post repost', async () => {
    const validPostCreationRequest = new PostsRequestDTO()
    validPostCreationRequest.userName = validUsers[0].userName
    validPostCreationRequest.postContent = 'This is a valid post'

    const serviceResponse = await createPostService.execute(validPostCreationRequest)

    const validRepostCreationRequest = new PostsRequestDTO()
    validRepostCreationRequest.userName = validUsers[1].userName
    validRepostCreationRequest.postId = serviceResponse.postCreated._id.toString()

    const respostServiceResponse = await createPostService.execute(validRepostCreationRequest)

    assert.notEqual(serviceResponse, null)
    assert.equal(respostServiceResponse.postCreated.user, savedUsers[1]._id.toString())
    assert.equal(respostServiceResponse.postCreated.postContent, null)
    assert.equal(respostServiceResponse.postCreated.repostedPost, serviceResponse.postCreated._id.toString())
  })

  it('Should create a new post quote repost', async () => {
    const validPostCreationRequest = new PostsRequestDTO()
    validPostCreationRequest.userName = validUsers[0].userName
    validPostCreationRequest.postContent = 'This is a valid post'

    const serviceResponse = await createPostService.execute(validPostCreationRequest)

    const validRepostCreationRequest = new PostsRequestDTO()
    validRepostCreationRequest.userName = validUsers[1].userName
    validRepostCreationRequest.postId = serviceResponse.postCreated._id.toString()
    validRepostCreationRequest.postContent = 'This is a valid repost'

    const respostServiceResponse = await createPostService.execute(validRepostCreationRequest)

    assert.notEqual(serviceResponse, null)
    assert.equal(respostServiceResponse.postCreated.user, savedUsers[1]._id.toString())
    assert.equal(respostServiceResponse.postCreated.postContent, validRepostCreationRequest.postContent)
    assert.equal(respostServiceResponse.postCreated.repostedPost, serviceResponse.postCreated._id.toString())
  })

  it('Should throw exception when username is not valid', async () => {
    const invalidUserRequest = new PostsRequestDTO()
    invalidUserRequest.userName = 'invalidUsername'
    invalidUserRequest.postContent = 'This is a valid post'

    await assert.rejects(async () => await createPostService.execute(invalidUserRequest),
      new ErrorHandler(400, 'Invalid username', 'Post creation')
    )
  })

  it('Should throw exception when trying to repost with invalid id', async () => {
    const invalidRepostIdRequest = new PostsRequestDTO()
    invalidRepostIdRequest.userName = validUsers[0].userName
    invalidRepostIdRequest.postContent = 'This is a valid post'
    invalidRepostIdRequest.postId = '63237ce500edff2d4507d26b'

    await assert.rejects(async () => await createPostService.execute(invalidRepostIdRequest),
      new ErrorHandler(400, 'Invalid post to be reposted', 'Post creation')
    )
  })

  it('Should throw exception when trying to repost a post from same user', async () => {
    const validPostCreationRequest = new PostsRequestDTO()
    validPostCreationRequest.userName = validUsers[0].userName
    validPostCreationRequest.postContent = 'This is a valid post'

    const serviceResponse = await createPostService.execute(validPostCreationRequest)

    const sameUserRepostRequest = new PostsRequestDTO()
    sameUserRepostRequest.userName = validUsers[0].userName
    sameUserRepostRequest.postId = serviceResponse.postCreated._id.toString()

    await assert.rejects(async () => await createPostService.execute(sameUserRepostRequest),
      new ErrorHandler(400, 'User cannot repost their own post', 'Post creation')
    )
  })

  it('Should throw exception when trying to post more than limit per day', async () => {
    const validPostCreationRequest = new PostsRequestDTO()
    validPostCreationRequest.userName = validUsers[0].userName
    validPostCreationRequest.postContent = 'This is a valid post'

    await createPostService.execute(validPostCreationRequest)

    const overPostLimitrequest = new PostsRequestDTO()
    overPostLimitrequest.userName = validUsers[0].userName
    overPostLimitrequest.postContent = 'This is a valid post'

    await assert.rejects(async () => await createPostService.execute(overPostLimitrequest),
      new ErrorHandler(400, 'Post creation limit reached', 'Post creation')
    )
  })
})
