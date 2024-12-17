import jwt from 'jsonwebtoken';
import keys from '../constants.config.js';
import userService from '../users/user.service.js';

const unauthorized = (res) => {
  res.status(401).json({ message: 'Unauthorized' });
};

function middleware(req, res, next) {
  if (req.url.startsWith('/api')) {
    const publicPaths = ['/api', '/api/auth/login', '/api/auth/register'];

    const isPublic = publicPaths.some((route) => req.path === route);

    if (isPublic) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return unauthorized(res);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return unauthorized(res);
    }

    jwt.verify(token, keys.JWT_PRIVATE_KEY, async (error, payload) => {
      if (error) {
        return unauthorized(res);
      }
      const user = await userService.getByEmail(payload.email);
      req.user = user;
      return next();
    });
  } else {
    return next();
  }
}

export default middleware;
