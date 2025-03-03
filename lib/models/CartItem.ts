import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

const CartItem = Sequelize.define("CartItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      }, 
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type:DataTypes.INTEGER,
        defaultValue: 1, // Set default value
      },
      color: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
    
  export default CartItem;