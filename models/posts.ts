import { Schema, model, Types } from 'mongoose';
import { validateDate, formattedNow } from '../utils';

interface Post {
  content: string,
  authorId: Types.ObjectId,
  tags: string[],
  likes: number,
  replyTo: Types.ObjectId,
  createdOn: string,
  editedAt: string
}

const postSchema = new Schema<Post>({
  content: {
    type: String,
    trim: true,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    trim: true,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    default: null
  },
  createdOn: {
    type: String,
    default: formattedNow,
    validate: [validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).']
  },
  editedAt: {
    type: String,
    default: null,
    validate: [validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).']
  }
});

const Post = model<Post>('Post', postSchema);

export = Post
