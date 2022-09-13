import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  userName: string
}

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, 'Username required!'],
    maxLength: [14, 'Username has maximum 14 characters!'],
    validate: {
      validator: (value: string) => {
        return !/[^a-z0-9]/gi.test(value)
      },
      message: 'Username is not a valid username!'
    }
  }

},
{
  timestamps: true
})

export default model<IUser>('User', userSchema)
