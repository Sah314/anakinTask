import { DataTypes, ENUM,UUIDV4} from 'sequelize';
import { sequelize } from '../utils/connectDb';
import logger from '../utils/logger';

export const Users = sequelize.define('Users', {
    userId:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
        },
    password:{
        type: DataTypes.STRING,
        allowNull: false
            },
    role:{
        type: ENUM('admin', 'user'),
        defaultValue: 'user'
        },
    currentBooking:{
        type: DataTypes.STRING,
        allowNull: true
    }
}
)

export const Ticket = sequelize.define('Tickets', {
    ticketId:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    trainNo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    seats:{
        type: DataTypes.INTEGER,
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
    date:{
        type: DataTypes.STRING,
        allowNull: false
    },
    }
)

sequelize.models.Tickets.belongsTo(Users, {foreignKey: 'userId', targetKey: 'userId'});
console.log(Users === sequelize.models.Users); // true

// Sync the model with the database
(async () => {
  await sequelize.sync(); // This will create the table in the database
  logger.info('User model synced with database');
})();
