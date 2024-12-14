import userModel from './user.model.js';

const userRepository = {
  create: async (userData) => {
    const user = await userModel.create(userData);
    return user;
  },

  getByEmail: async (email) => {
    const user = await userModel.findOne({ email });
    return user;
  },
};

export default userRepository;
