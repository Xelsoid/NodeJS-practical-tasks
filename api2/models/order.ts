import { DataTypes } from "sequelize";

export default (sequelize, User) =>
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.UUIDV4,
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
      cartId: {
        type: DataTypes.STRING,
        references: {
          model: User,
          key: "id",
        },
      },
      items: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.INTEGER,
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
