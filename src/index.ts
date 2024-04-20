import express from 'express';
import dotenv from 'dotenv';
import logger from './utils/logger';
import { connectDb } from './utils/connectDb';
import router from './routes/routes';
dotenv.config({ path: '.env' });
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/",router);

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
  connectDb();
});