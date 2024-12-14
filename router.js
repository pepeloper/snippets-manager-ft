import { Router } from 'express';
import snippetsRoutes from './snippets/snippets.router.js';
import authRoutes from './auth/auth.router.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a mi API');
});

router.use('/snippets', snippetsRoutes);
router.use('/auth', authRoutes);

export default router;
