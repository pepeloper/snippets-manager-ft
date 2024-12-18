import { Router } from 'express';
import { snippetsController } from './snippets.controller.js';

const router = Router();

router.get('/', snippetsController.index);
router.post('/', snippetsController.create);
router.put('/:id', snippetsController.update);
router.delete('/:id',snippetsController.delete);

export default router;
