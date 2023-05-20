import { Schema, model } from 'mongoose';

interface Post {
  content: string,
  authorId: string,
  tags: string[],
  likes: number,
  replyTo: string,
  createdOn: string,
  editedAt: string
}

const postSchema = new Schema<Post>({
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  tags: [{ type: String }],
  likes: { type: Number, default: 0 },
  replyTo: { type: String, default: "" },
  createdOn: { type: String, default: Date.now().toString() },
  editedAt: { type: String, default: "" }
})

const Post = model<Post>("Post", postSchema);

export = Post