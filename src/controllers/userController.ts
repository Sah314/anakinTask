import { Request, Response } from 'express';

type userInfo = {
    email: string;
    password: string;
}

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as userInfo;
        // Rest of the code...
    } catch (error) {
        // Handle error...
    }
}

const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as userInfo;
        //Todo: Add user to database
        //Todo: Check if user already exists
        
        


        // Rest of the code...
    } catch (error) {
 
        // Handle error...
    }
}