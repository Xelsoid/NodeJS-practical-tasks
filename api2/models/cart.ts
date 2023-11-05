import { DataTypes } from "sequelize";

export default (sequelize, User) =>
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: User,
          key: "id",
        },
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "cart", // We need to choose the model name
      tableName: "cart",
      timestamps: false,
    },
  );
