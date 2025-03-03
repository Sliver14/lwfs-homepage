import sequelize from "../sequelize";
import SignUp from "./SignUp";
import Comment from "./Comment";
import Attendance from "./Attendance";
import Cart from "./Cart";
import CartItem from "./CartItem";
import Products from "./Products";

// Define associations
SignUp.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(SignUp, { foreignKey: "userId", as: "user" });

SignUp.hasMany(Attendance, { foreignKey: "userId", as: "attendances" });
Attendance.belongsTo(SignUp, { foreignKey: "userId", as: "user" });

SignUp.hasOne(Cart, { foreignKey: "userId", as: "cart" } );
Cart.belongsTo(SignUp, { foreignKey: "userId", as: "user" });

Cart.hasMany(CartItem, { foreignKey: "cartId", as: "cartItems" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", as: "cart" });

Products.hasMany(CartItem, { foreignKey: "productId", as: "cartItems" });
CartItem.belongsTo(Products, { foreignKey: "productId", as: "product" }); // ✅ Fixed alias

// Use named exports instead of default
export { sequelize, SignUp, Comment, Attendance, Cart, CartItem, Products };
