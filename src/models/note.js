import {Schema, model} from 'mongoose';
const notesSchema =  new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
    default: '',
  },
  tag: {
    enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
    default: 'Todo',
  }
},{
  timestamps: true
}
);
export const Note = model('Note', notesSchema);
