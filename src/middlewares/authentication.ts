import { NextFunction,Request,Response} from "express";
import dotenv from "dotenv";
import jwt,{ Secret } from "jsonwebtoken";
import { Users } from "../models/users";
dotenv.config({path: '.env'});

const jwtsecret = process.env.jwtSecret;
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
        try{
            let token;
            const authHeader = req.headers['authorization'];
            token = authHeader && authHeader.split(' ')[1];
            if(token == null) return res.sendStatus(401).send('Token not found');

            let decodedToken = jwt.verify(token, jwtsecret as Secret);
            decodedToken = decodedToken as {email: string, userId: string};
            const findUser = await Users.findOne({where: {email: decodedToken.email}});
            if(!findUser){
                return res.sendStatus(404).send('User not found');
            }
            if(decodedToken.exp && decodedToken.exp < Date.now()){
                return res.sendStatus(401).send('Token expired');
            }
            next();
        }
        catch(error){
            return res.sendStatus(500).send('Internal Server Error');
        }
}