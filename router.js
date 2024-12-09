import { Router } from "express";
import snippetsRoutes from "./snippets/snippets.router.js";


const router = Router();

router.get( '/', (req, res) => {
  console.log('Esto es un get');
  res.send("Bienvenido a mi API");
});

router.use('/snippets' , snippetsRoutes);

export default router;