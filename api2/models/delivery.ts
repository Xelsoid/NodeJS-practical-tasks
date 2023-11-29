import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define(
    "delivery",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "delivery", // We need to choose the model name
      tableName: "delivery",
      timestamps: false,
    },
  );
