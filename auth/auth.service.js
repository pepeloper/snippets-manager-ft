import { compareSync, hashSync } from 'bcrypt';
import userRepository from '../users/user.repository.js';
import jwt from 'jsonwebtoken';
import keys from './constants.config.js';

const generateToken = (email) => {
  const token = jwt.sign({ email }, keys.JWT_PRIVATE_KEY);
  return token;
};

const validateUserFields = (userData) => {
  const requiredFields = ['email', 'password', 'username'];

  for (const field of requiredFields) {
    if (!userData[field]) {
      throw new Error('Missing required field');
    }
  }
};

const authService = {
  register: async (userData) => {
    try {
      validateUserFields(userData);

      const hashedPassword = hashSync(userData.password, 10);
      userData.password = hashedPassword;
      const user = await userRepository.create(userData);
      const token = generateToken(user.email);

      return { user, token };
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email y/o usuario ya registrado.');
      }
    }
  },
  login: async (email, password) => {
    const user = await userRepository.getByEmail(email);

    if (!user) {
      throw new Error('No user found with this email');
    }

    const isSamePassword = compareSync(password, user.password);
    if (!isSamePassword) {
      throw new Error('Password dont match');
    }

    const token = generateToken(user.email);

    return { user, token };
  },
};

export default authService;
