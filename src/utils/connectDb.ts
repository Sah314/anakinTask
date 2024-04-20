import { Sequelize } from 'sequelize';
import logger from './logger';

export const sequelize = new Sequelize('postgresql://sahil:sahil@localhost:5432/test', {logging: false}) 

export const connectDb = async () => {

try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (error) {
  logger.error('Unable to connect to the database:', error);
}
}

