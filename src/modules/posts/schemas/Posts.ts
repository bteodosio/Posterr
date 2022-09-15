import { Schema, model, Document, Types } from 'mongoose'

export interface IPosts extends Document {
  user: Types.ObjectId
  postContent: string
  repostedPost?: Types.ObjectId
}

const postsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required!']
  },

  postContent: {
    type: String,
    maxLength: [777, 'Post content has maximum 777 characters!']
  },

  repostedPost: {
    type: Schema.Types.ObjectId,
    ref: 'Posts'
  }

},
{
  timestamps: true
})

export default model<IPosts>('Posts', postsSchema)
