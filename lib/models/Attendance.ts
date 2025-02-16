import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

const Attendance = Sequelize.define("Attendance", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      page: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      groupParticipation: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: DataTypes.STRING,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      ipAddress: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
    
  export default Attendance;