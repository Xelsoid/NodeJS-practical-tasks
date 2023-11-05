import { DataTypes } from "sequelize";

export default (sequelize, Employee) =>
  sequelize.define(
    "hardware",
    {
      Serial: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      os: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ram: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employeeid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: Employee, // Name of the referenced table
          key: "id", // Primary key of the referenced table
        },
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "hardware", // We need to choose the model name
      tableName: "hardware",
      timestamps: false,
    },
  );
