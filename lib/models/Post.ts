import { DataTypes } from "sequelize";
import Sequelize from "../sequelize";

    const PostPage = Sequelize.define("PostPage", {
        postPhoto: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true, // Ensures the value is not an empty string
                // isAlpha: true, // Ensures only alphabetic characters
            },
        },
        postTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                // isAlpha: true,
            },
        },
        postBody: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        
    }, {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        freezeTableName: true, // Prevents Sequelize from pluralizing table name
    });

    export default PostPage;
