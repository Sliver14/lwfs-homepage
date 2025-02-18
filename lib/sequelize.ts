// import { Sequelize } from "sequelize";
// import mysql2 from "mysql2";

// const sequelize = new Sequelize({
//   dialect: "mysql",
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   dialectModule: mysql2,
//   logging: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 60000,  // Increase to 60 seconds
//     idle: 20000,     // Increase idle time
//   },
//   retry: {
//     max: 5, // Retry up to 5 times on failure
//   },
// });

// export default sequelize;

// import { Sequelize } from "sequelize";
// const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
//   dialect: "mysql",
//   dialectOptions: {
//     connectTimeout: 60000, // Increase timeout
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     acquire: 60000, // Increase acquisition timeout
//     idle: 10000,
//   },
//   logging: false, // Disable query logging for production
// });

// export default sequelize;

import mysql2 from "mysql2"; // Ensure mysql2 is imported
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "mysql",
  dialectModule: mysql2, // Explicitly set mysql2 as the dialect
  logging: console.log,
});

export default sequelize;