import { NextFunction,Request,Response} from "express";
import dotenv from "dotenv";
import jwt,{ Secret } from "jsonwebtoken";
import { Users } from "../models/users";
import logger from "../utils/logger";
dotenv.config({path: '.env'});

const jwtsecret = process.env.jwtSecret;
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
        try{
            logger.info("here");
            let token;
            const authHeader = req.headers['authorization'];
            token = authHeader && authHeader.split(' ')[1];
            if(token == null) return res.status(401).send('Token not found');
            let decodedToken = jwt.verify(token, jwtsecret as Secret);
            decodedToken = decodedToken as {email: string, userId: string};
            const findUser = await Users.findOne({where: {email: decodedToken.email}});
            if(!findUser){
                return res.status(404).send('User not found');
            }
            let tokenexp = decodedToken.exp;
           
            if(tokenexp && tokenexp*1000 < Date.now()){
                return res.status(401).send('Token expired');
            }
            next();
        }
        catch(error){
            res.status(500).send({message:'Internal Server Error',error:error});
        }
}