import { DataTypes } from "sequelize";

export default (sequelize, User, Cart, Payment, Delivery) =>
  sequelize.define(
    "order",
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
      cartId: {
        type: DataTypes.STRING,
        references: {
          model: Cart,
          key: "id",
        },
      },
      paymentId: {
        type: DataTypes.STRING,
        references: {
          model: Payment,
          key: "id",
        },
      },
      deliveryId: {
        type: DataTypes.STRING,
        references: {
          model: Delivery,
          key: "id",
        },
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
      modelName: "order", // We need to choose the model name
      tableName: "order",
      timestamps: false,
    },
  );
