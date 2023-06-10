import { Schema, model } from 'mongoose';

interface User {
  username: string,
  googleId: string
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
});

const User = model<User>('User', userSchema);

export = User
