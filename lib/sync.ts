import sequelize from "../lib/sequelize";
import SignUp from "../models";
import Comment from "../models"; // Import all models

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } to reset tables
    console.log("✅ Database synced successfully");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
};