import { Request,Response,NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
    
  const adminAPIKey = req.headers['ADMIN_API_KEY'];
  if(adminAPIKey === process.env.ADMIN_API_KEY){
    next();
  }
  else{
    res.status(401).send('Unauthorized');
  }
}
export default checkAdmin;