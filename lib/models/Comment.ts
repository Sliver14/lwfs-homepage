import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

  const Comment = Sequelize.define("Comment", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ensure only logged-in users can comment
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  export default Comment;

