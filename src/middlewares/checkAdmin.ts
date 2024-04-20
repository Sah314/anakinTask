import { Request,Response,NextFunction } from "express";
import logger from "../utils/logger";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    
    const adminAPIKey = req.headers["admin_api_key"];
    logger.info(adminAPIKey);
  if(!adminAPIKey){
    return res.status(404).send('APIKey field doesnt exist in the header');
  }
  if(adminAPIKey === process.env.APIKey){
    next();
  }
  else{
    return res.status(401).send('Unauthorized');
  }
}
export default checkAdmin;