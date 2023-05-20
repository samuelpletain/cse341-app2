import { Schema, model } from 'mongoose';

interface Author {
  firstName: String,
  lastName: String,
  email: String,
  joinedOn: String
}

const authorSchema = new Schema<Author>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  joinedOn: { type: String, default: new Date(Date.now()).toDateString() }
})

const Author = model<Author>("Author", authorSchema);

export = Author