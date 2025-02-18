const mysql2 = require("mysql2");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dialectModule: require ("mysql2"), // Explicitly specify mysql2 as the dialect module
  logging: false, // Disable logging, optional
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, 
    idle: 10000,
  },
});

export default sequelize;
