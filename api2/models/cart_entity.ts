import { DataTypes } from "sequelize";

export default (sequelize, Cart, Product, Order) =>
  sequelize.define(
    "cartItem",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      cartId: {
        type: DataTypes.STRING,
        references: {
          model: Cart,
          key: "id",
        },
      },
      // order: {
      //   type: DataTypes.UUIDV4,
      //   references: {
      //     model: Order,
      //     key: "id",
      //   },
      // },
      productId: {
        type: DataTypes.STRING,
        references: {
          model: Product,
          key: "id",
        },
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: "cartItem", // We need to choose the model name
      tableName: "cartItem",
      timestamps: false,
    },
  );
