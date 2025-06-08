import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize"; // Ensure correct path

// ✅ Define Cart Attributes
interface CartAttributes {
  id: number;
  userId: number;
  createdAt: Date;
}

// ✅ Define the Cart model with TypeScript
class Cart extends Model<CartAttributes, Partial<CartAttributes>> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public readonly createdAt!: Date;
}

Cart.init(
  {
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
  },
  {
    sequelize,
    modelName: "Cart",
    timestamps: true, // Ensures createdAt & updatedAt are managed
  }
);

export default Cart;
