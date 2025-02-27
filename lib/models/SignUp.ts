    import { DataTypes } from "sequelize";
    import sequelize from "../sequelize";
   
    const SignUp = sequelize.define(
        "SignUp",
        {
          firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              is: /^[A-Za-z\s]+$/, // Allows letters and spaces
              notEmpty: true, // Prevents empty strings
            },
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              is: /^[A-Za-z\s]+$/, // Allows letters and spaces
              notEmpty: true, // Prevents empty strings
            },
          },
          country: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { notEmpty: true, isNumeric: true },
          },
          zone: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          church: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          verificationCode: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
        },

        {
          tableName: "signups", // 👈 Explicitly set the table name
        }
    
      );

      export default SignUp;
      