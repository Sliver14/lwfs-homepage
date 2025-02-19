import sequelize from "../sequelize";
import SignUp from "./SignUp";
import Comment from "./Comment";
import Attendance from "./Attendance";

// Define associations
SignUp.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(SignUp, { foreignKey: "userId", as: "user" });

SignUp.hasMany(Attendance, { foreignKey: "userId", as: "attendances" });
Attendance.belongsTo(SignUp, { foreignKey: "userId", as: "user" });

// Use named exports instead of default
export { sequelize, SignUp, Comment, Attendance };
