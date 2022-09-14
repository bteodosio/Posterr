import Posts from '@modules/posts/schemas/Posts'
import Users from '@modules/users/schemas/Users'
import assert from 'assert'

const validPost = {
  user: new Users({ userName: 'bteodosio' }),
  postContent: 'Valid post'
}

describe('Tests for post schema', () => {
  it('Should create a valid post', async () => {
    const post = new Posts(validPost)

    const validationError = post.validateSync()

    assert.equal(validationError, null)
  })

  it('Should create a valid repost', async () => {
    const post = new Posts(validPost)
    const repost = new Posts({
      user: new Users({ userName: 'bteodosio' }),
      postContent: '',
      repostedPost: post
    })

    const validationError = repost.validateSync()

    assert.equal(validationError, null)
  })

  it('Should create a valid quote-post', async () => {
    const post = new Posts(validPost)
    const quotePost = new Posts({
      user: new Users({ userName: 'bteodosio' }),
      postContent: 'This is a valid quote post',
      repostedPost: post
    })

    const validationError = quotePost.validateSync()

    assert.equal(validationError, null)
  })

  it('Should require a user when creating a post', async () => {
    const invalidPost = {
      postContent: 'Valid post'
    }
    const post = new Posts(invalidPost)

    const validationError = post.validateSync()

    assert.equal(validationError?.errors.user.message, 'User is required!')
  })

  it('Should not accept more than 777 characters to post Content', async () => {
    const invalidPost = validPost

    let moreThanMaxChar = ''
    for (let i = 0; i < 500; i++) {
      moreThanMaxChar += Math.floor(Math.random() * 800).toString(36).substring(0, 800)
    }

    console.log(moreThanMaxChar.length)

    invalidPost.postContent = moreThanMaxChar
    const post = new Posts(invalidPost)

    const validationError = post.validateSync()

    assert.equal(validationError?.errors.postContent.message, 'Post content has maximum 777 characters!')
  })
})
