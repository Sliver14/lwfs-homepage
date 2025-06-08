import mysql2 from "mysql2"; // Ensure mysql2 is imported
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "mysql",
  dialectModule: mysql2, // Explicitly set mysql2 as the dialect
  logging: console.log,
});

export default sequelize;