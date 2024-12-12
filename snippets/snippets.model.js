import { model, Schema } from 'mongoose';

const snippetsSchema  = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const snippetsModel = model('Snippets', snippetsSchema);

export default snippetsModel;