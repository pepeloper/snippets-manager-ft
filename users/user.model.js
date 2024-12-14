import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
});

const userModel = model('User', userSchema);

export default userModel;
