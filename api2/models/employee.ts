import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "employee",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      joindate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "employee", // We need to choose the model name
      tableName: "employee",
      timestamps: false,
    },
  );
