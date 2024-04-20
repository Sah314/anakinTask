import { Request, Response } from 'express';
import { Users } from '../models/users';
import logger from '../utils/logger';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });


let jwtsecret = process.env.jwtSecret;
if(!jwtsecret){
    logger.error('JWT secret not found');
    process.exit(1);
}


export const login = async (req: Request, res: Response) => {

    try {
        const { email, password} = req.body;
        logger.info('Login request received');
        const currUser = await Users.findOne({where: {email: email}});
        if(!currUser){
            return res.status(400).send('User doesn\'t exist');
        }
        const isMatch = bcrypt.compareSync(password, currUser.getDataValue('password'));

        if(!isMatch){
            return res.status(400).send('Invalid credentials');
        }

        let token;
        token = jwt.sign({
            email: email,
            userId: currUser.getDataValue('id')
        }, jwtsecret as Secret, {expiresIn: '1h'})
        return res.status(200).send({message: 'Login successful', data: {email: email,token:token}});
        // Rest of the code...
    } catch (error) {
        // Handle error...
        return res.status(500).send({message:'Internal Server Error', error:error});
    }
}

export const signup = async (req: Request, res: Response) => {
    logger.info('Signup request received');
    try {
        const { email, password,role } = req.body ;
        //Todo: Check if user already exists
        if(await Users.findOne({where: {email: email}})){
            res.status(400).send('User already exists');
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const encryptedpassword = bcrypt.hashSync(password, salt);
        //Todo: Add user to database
        const newUser = await Users.create({email: email, password: encryptedpassword,role:role});        
        await newUser.save();
        logger.info(newUser,'newUser: ');

        res.status(201).send({message: 'User created successfully', data: newUser});
        
    } catch (error) {
        res.status(500).send({message:'Internal Server Error', error:error});
        
    }
}