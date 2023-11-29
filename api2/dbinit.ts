import { Sequelize } from "sequelize";
import userModel from "./models/users";
import cartModel from "./models/cart";
import productModel from "./models/product";
import cartItem from "./models/cartItem";
import orderModel from "./models/order";
import deliveryModel from "./models/delivery";
import paymentModel from "./models/payment";

const sequelize = new Sequelize("node_gmp", "node_gmp", "password123", {
  host: "127.0.0.1",
  dialect: "postgres",
});

const checkDataBaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const Product = productModel(sequelize);
const User = userModel(sequelize);
const Cart = cartModel(sequelize, User);
const CartItem = cartItem(sequelize, Cart, Product);
const Delivery = deliveryModel(sequelize);
const Payment = paymentModel(sequelize);
const Order = orderModel(sequelize, User, Cart, Payment, Delivery);

const syncDB = async () => {
  User.hasMany(Cart);
  Cart.belongsTo(User);
  Cart.hasMany(CartItem);
  CartItem.belongsTo(Cart);
  Product.hasMany(CartItem);
  CartItem.belongsTo(Product);

  Delivery.hasOne(Order);
  Payment.hasOne(Order);
  Cart.hasOne(Order);
  User.hasOne(Order);

  Order.belongsTo(Delivery);
  Order.belongsTo(Payment);
  Order.belongsTo(Cart);
  Order.belongsTo(User);

  await sequelize.sync();
  console.log("DB is synchronized");
};

syncDB();

export { sequelize, checkDataBaseConnection, User, Cart, CartItem, Product, Order, Payment, Delivery };
