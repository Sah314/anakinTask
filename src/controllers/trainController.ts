import { Request, Response } from 'express';
import { Train, TrainSchedule, availableSeats } from '../models/trains';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from '../models/users';


export const getSeatAvailability = async (req: Request, res: Response) => {
    try {
        // Get the source and destination from the request
        const { source, destination } = req.body;
        if(!source){
            res.json(404).send({message:"Please send Source station"});
        }
        if(!destination){
            res.json(404).send({message:"Please send Destination station"});
        }
        let availableTrains;
        // Get the trains from the database
        // Filter the trains based on source and destination
        availableTrains = await Train.findAll({where: {source: source, destination: destination}});

        // Send the response
        res.status(200).send({message:'Success',data:availableTrains});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export const bookTicket = async (req: Request, res: Response) => {
    try {
    const { trainNumber, date, seats,userId} = req.body;
     if (!trainNumber || !date || !seats || !userId) {
            return res.status(404).send('Please provide train number, date, and seats');
        }
        // Check if the train exists
        let train = await Train.findOne({ where: { trainNo: trainNumber } });
        if (!train) {
            return res.status(404).send('Train not found');
        }
        let trainSchedule = await TrainSchedule.findOne({ where: { trainNo: trainNumber, date: date } });
        if(!trainSchedule){
            return res.status(404).send('Train not running on the given date');
        }

        // Check if the seats are available
        if (trainSchedule.getDataValue('seats') < seats) {
            return res.status(404).send('Seats not available');
        }

        // Update the seats
        let availseats = await availableSeats.findAll({ where: { trainNo: trainNumber, inBookingState: false, isBooked: false } });

       await Promise.all(availseats.slice(0, seats).map(seat => seat.update({ inBookingState: true })));
       
       //Payment gateway integration
       //...
       //...
       //Setting the isBooked field to true
       await Promise.all(availseats.slice(0, seats).map(seat => seat.update({ inBooked: true })));
       const currTicket = await Ticket.create({ trainNo: trainNumber, date: date, source: train.getDataValue('source'), destination: train.getDataValue('destination'), seats: seats, ticketId: uuidv4(),userId:userId});

       trainSchedule.update({seats: trainSchedule.getDataValue('seats') - seats});
    // Send the response
    res.status(200).send({message:'Successfully booked the ticket',data:currTicket});
    } catch (error) {
        res.status(500).send({message:'Internal Server Error',error:error});
    }
}

export const getBookingDetails = async (req: Request, res: Response) => {
    
    try {const {ticketId} = req.body;
    if(!ticketId){
        res.status(404).send('Please provide ticket id');
    }
    const ticket = await Ticket.findOne({where: {ticketId: ticketId}});
    if(!ticket){
        res.status(404).send('Ticket not found');
    }
    res.status(200).send({message:'Success',data:ticket});
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}