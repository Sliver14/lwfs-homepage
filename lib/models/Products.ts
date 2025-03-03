import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

const Products = Sequelize.define("Products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }, 
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  colors: {
    type: DataTypes.JSON, // Allows storing arrays/objects
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "products",
  timestamps: false, // Disable default timestamps since we define created_at
});

export default Products;
