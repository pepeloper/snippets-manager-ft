/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database.js';
import router from './router.js';
import authMiddleware from './middleware/auth.middleware.js';

const PORT = 3000;

export const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(authMiddleware);
app.use('/api',router);
app.use(express.static('public'));

// Solo conectar si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  connectToDatabase();
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
