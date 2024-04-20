import { DataTypes } from 'sequelize';
import { sequelize } from '../utils/connectDb';
import logger from '../utils/logger';


export const Train = sequelize.define('Trains', {
        trainNo: {
            type: DataTypes.STRING, 
            allowNull: false,
            primaryKey : true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        source:{
            type: DataTypes.STRING,
            allowNull: false
        },
        destination:{
            type: DataTypes.STRING,
            allowNull: false
        },
        fare:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        }
)

export const TrainSchedule = sequelize.define('TrainSchedule', {
    trainNo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    date:{
        type: DataTypes.STRING,
        allowNull: false
    },
    departureTime: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seats:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    }
);

export const availableSeats = sequelize.define('availableSeats', {
    trainNo: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    seatNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    inBookingState: { 
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    isBooked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    }
);

Train.hasMany(TrainSchedule, {foreignKey: 'trainNo'});
Train.hasMany(availableSeats, {foreignKey: 'trainNo'});

console.log(Train === sequelize.models.Train); // true

// Sync the model with the database
(async () => {
  await sequelize.sync(); // This will create the table in the database
  logger.info('Train model synced with database');
})();

