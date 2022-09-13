import Users from '@modules/users/schemas/Users'
import assert from 'assert'

const validUser = {
  userName: 'bteodosio',
  firstName: 'Bruno',
  lastName: 'Teodosio',
  email: 'bruno.teodosio@gmail.com'
}

describe('Tests for user schema', () => {
  it('Should create a valid user', async () => {
    const user = new Users(validUser)

    const validationError = user.validateSync()

    assert.equal(validationError, null)
  })

  it('Should require username', async () => {
    const invalidUser = {
      userName: null,
      firstName: 'Bruno',
      lastName: 'Teodosio',
      email: 'bruno.teodosio@gmail.com'
    }
    const user = new Users(invalidUser)

    const validationError = user.validateSync()

    assert.equal(validationError?.errors.userName.message, 'Username required!')
  })

  it('Should accept max 14 characters to username', async () => {
    const invalidUser = validUser
    invalidUser.userName = 'fdsfsdfsdfadfasdfsadfasdfsdafsdafsdafsdagdsgsdagsdgsda'
    const user = new Users(invalidUser)

    const validationError = user.validateSync()

    assert.equal(validationError?.errors.userName.message, 'Username has maximum 14 characters!')
  })

  it('Should accept only alphanumeric characters to username', async () => {
    const invalidUser = validUser
    invalidUser.userName = 'bteodosio!@_ '
    const user = new Users(invalidUser)

    const validationError = user.validateSync()

    assert.equal(validationError?.errors.userName.message, 'Username is not a valid username!')
  })
})
