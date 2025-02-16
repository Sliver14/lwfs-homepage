import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; // Ensure this is added
// import dotenv from "dotenv";

// dotenv.config();

const sequelize = new Sequelize( 
  process.env.DATABASE_NAME!, 
  process.env.DATABASE_USER!, 
  process.env.DATABASE_PASSWORD!, 
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql", // Change to "postgres" if using PostgreSQL
    dialectModule: mysql2, // Ensure this line is present
    logging: false, // Disable logging in production
});

export default sequelize;
