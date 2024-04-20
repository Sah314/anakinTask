import express from 'express';
import dotenv from 'dotenv';
import logger from './utils/logger';
dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});