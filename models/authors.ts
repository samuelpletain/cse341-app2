import { Schema, model } from 'mongoose';
import { validateDate, validateEmail, formattedNow } from '../utils';

interface Author {
  firstName: string,
  lastName: string,
  email: string,
  joinedOn: string
}

const authorSchema = new Schema<Author>({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please enter a valid email address.']
  },
  joinedOn: {
    type: String,
    trim: true,
    default: formattedNow,
    validate: [validateDate, 'Please enter a valid date (ISO 8601 without milliseconds).']
  }
});

const Author = model<Author>('Author', authorSchema);

export = Author
