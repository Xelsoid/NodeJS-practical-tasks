import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "user", // We need to choose the model name
      tableName: "user",
      timestamps: false,
    },
  );
