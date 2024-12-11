import { Router } from "express";
import { snippetsController } from "./snippets.controller.js";

const router = Router();

router.get( '/', snippetsController.index);
router.post( '/', snippetsController.create);

export default router;