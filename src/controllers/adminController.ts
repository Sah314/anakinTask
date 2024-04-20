import { Request, Response } from 'express';
import { Train, TrainSchedule } from '../models/trains';

type trainInfo = {  
    title: string;
    trainNumber:string;
    source: string;
    destination: string;
    date: string;
    availableSeats: number;
}

export const addTrain = async (req: Request,res: Response) => {
    try {
        const { title,trainNumber,source,destination,date,availableSeats} = req.body as trainInfo;
        if(!title || !trainNumber || !source || !destination || !date || !availableSeats){
            res.status(400).send('Please provide all the fields');
        }
        let train = await Train.findOne({where: {trainNo: trainNumber}});
        if(train){
            
        }
        let newTrain = await Train.create({
            trainNo: trainNumber,
            name: title,
            source: source,
            destination: destination,
            seats: availableSeats,
            fare: 0, // Assuming fare is not provided in the request body
        });
        let trainSchedule = await TrainSchedule.create({
            trainNo: trainNumber,
            date: date,
            departureTime: '00:00', // Hardcoding departure time to 00:00
            arrivalTime: '08:00' // Hardcoding arrival time to 08:00
        })
        
         res.status(201).json({ message: 'Train added successfully', data: newTrain });
}
catch (error) {
 console.error('Error adding train:', error);
        res.status(500).json({ message: 'Internal Server Error' });
}
}

export const checkHealth = async (req: Request, res: Response) => {
    res.status(200).send('Server is up and running');
}