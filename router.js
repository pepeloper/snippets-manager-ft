import { Router } from 'express';
import snippetsRoutes from './snippets/snippets.router.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Bienvenido a mi API');
});

router.use('/snippets' , snippetsRoutes);

export default router;