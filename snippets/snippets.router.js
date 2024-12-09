import { Router } from "express";
import { snippetsController } from "./snippets.controller.js";

const router = Router();

router.get( '/', snippetsController.index);

export default router;