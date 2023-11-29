import { Sequelize } from "sequelize";
import { randomUUID } from "crypto";
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

  console.log("uuid ", randomUUID());
  // CartEntity.hasMany(Cart);
  // CartEntity.hasMany(Product);
  // Cart.belongsTo(CartEntity);
  // Product.belongsTo(CartEntity);
  // await Delivery.drop({ cascade: true });
  // await Payment.drop({ cascade: true });
  // await Order.drop({ cascade: true });
  await sequelize.sync();
  const product = await Product.findByPk(
    "51422fcd-0366-4186-ad5b-c23059b6f64f",
  );
  console.log(product.id);
  const user = await User.findByPk("0fe36d16-49bc-4aab-a227-f84df899a6cb");
  console.log(user.id);

  // await Cart.destroy({ where: { id: "1434fec6-cd85-420d-95c0-eee2301a971d" } });
  // const cart = await Cart.create({
  //   id: "1434fec6-cd85-420d-95c0-eee2301a971d",
  //   userId: user.id,
  //   isDeleted: false,
  // });
  // console.log(cart);
  //
  // await CartEntity.destroy({ where: { id: "1434fec6-cd85-420d-95c0-eee2301a971d" } });
  // CartEntity.update({cart: "cartId"});
  // const cartEntitytest = await CartEntity.create({
  //   id: randomUUID(),
  //   cartId: "1434fec6-cd85-420d-95c0-eee2301a971d",
  //   productId: "51422fcd-0366-4186-ad5b-c23059b6f64f",
  //   // order: 'anyorder'
  //   count : 5,
  // });
  // // console.log(cart);
  // console.log(cartEntitytest);



  // const user = User.create({
  //   id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  // });
  console.log("DB is synchronized");
};

syncDB();

export { sequelize, checkDataBaseConnection, User, Cart, CartItem, Product };
