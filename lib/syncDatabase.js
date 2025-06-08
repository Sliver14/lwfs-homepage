import sequelize from "./sequelize";
import { SignUp, Comment, Attendance, Cart, CartItem, Products } from "./models"; 
// or wherever your index file is

// Just reference to avoid unused import errors
void SignUp;
void Comment;
void Attendance;
void Cart;
void CartItem;
void Products;

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");

    // Just importing models here registers them on sequelize, so sync will work properly.
    await sequelize.sync({ alter: true }); // or { force: true } if you want to drop tables
    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};

export default syncDatabase;
