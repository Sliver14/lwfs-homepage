import { DataTypes, Model } from "sequelize";
import sequelize from "../sequelize";

// ✅ Define the CartItem attributes
interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  color?: string;
  createdAt?: Date;
}

// ✅ Define the CartItem Model
class CartItem extends Model<CartItemAttributes, Partial<CartItemAttributes>> implements CartItemAttributes {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public color?: string;
  public readonly createdAt!: Date;
}

CartItem.init(
  {
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
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "CartItem",
    timestamps: true, // Ensures createdAt & updatedAt are managed
  }
);

export default CartItem;
