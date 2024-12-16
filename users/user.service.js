import userRepository from './user.repository.js';

const userService = {
  getByEmail: async (email) => {
    const user = await userRepository.getByEmail(email);
    if (!user) {
      throw new Error('No user found with this email');
    }
    return user;
  },
};

export default userService;
