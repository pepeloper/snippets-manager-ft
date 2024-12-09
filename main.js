import express from 'express';
import { connectToDatabase } from './database.js';

const PORT = 3000;

const app = express();
app.use(express.json());

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

