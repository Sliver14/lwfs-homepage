import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

const Cart = Sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
     
    });
    
  export default Cart;