import jwt from 'jsonwebtoken';
import keys from '../constants.config.js';
import userService from '../users/user.service.js';

const unauthorized = (res) => {
  res.status(401).json({ message: 'Unauthorized' });
};

function middleware(req, res, next) {
  const publicRoutes = [
    '/api',
    '/api/auth/login',
    '/api/auth/register',
  ];

  const isPublic = publicRoutes.some((route) => route === req.url);

  if(isPublic) {
    next();
    return;
  }
  const authHeader =  req.headers.authorization;
  const token = authHeader.split(' ')[1];

  if(!token) {
    unauthorized(res);
    return;
  }
  jwt.verify(token, keys.JWT_PRIVATE_KEY, async (error, payload) => {
    if(error) {
      unauthorized(res);
      return;
    }
    const user = await userService.getByEmail(payload.email);
    req.user = user;
    return next();
  });
}

export default middleware;
