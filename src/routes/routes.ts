import { Router } from "express";
import {login, signup} from "../controllers/userController";
import {addTrain, checkHealth} from "../controllers/adminController";
import {bookTicket, getBookingDetails, getSeatAvailability} from "../controllers/trainController";
import checkAdmin from "../middlewares/checkAdmin";
import { authentication } from "../middlewares/authentication";
export const router = Router();

const userRouter = Router();
//For user authentication
userRouter.post('/login', login);
userRouter.post('/signup', signup);
//For user operations
userRouter.post('/getTrains', authentication ,getSeatAvailability);
userRouter.post('/getTicket',authentication,getBookingDetails);
userRouter.post('/bookTickets',authentication, bookTicket);

const adminRouter = Router();
adminRouter.post('/addTrain', addTrain);
adminRouter.get('/checkHealth', checkHealth);

router.use('/user', userRouter);

router.use('/admin',checkAdmin,adminRouter);





export default router;