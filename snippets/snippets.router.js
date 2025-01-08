import { Router } from 'express';
import { snippetsController } from './snippets.controller.js';
import { isAuthor } from '../middleware/snippetAuthor.middleware.js';

const router = Router();

router.get('/', snippetsController.index);
router.post('/', snippetsController.create);
router.put('/:id', isAuthor, snippetsController.update);
router.delete('/:id', isAuthor, snippetsController.delete);

export default router;
