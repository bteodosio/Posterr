import mongoose, { Schema, model, Document } from 'mongoose'

interface IPosts extends Document {
  user: mongoose.Schema.Types.ObjectId
  postContent: string
  repostedPost: mongoose.Schema.Types.ObjectId
}

const postsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required!']
  },

  postContent: {
    type: String,
    maxLength: [777, 'Post content has maximum 777 characters!']
  },

  repostedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }

},
{
  timestamps: true
})

export default model<IPosts>('Posts', postsSchema)
