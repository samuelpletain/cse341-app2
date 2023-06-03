import mongoose, { Schema, model, Types } from 'mongoose';

interface User {
  username: String,
  googleId: String
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
})

const User = model<User>("User", userSchema);

export = User