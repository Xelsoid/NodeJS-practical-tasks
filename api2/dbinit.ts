import { Sequelize } from "sequelize";
import { randomUUID } from "crypto";
import userModel from "./models/users";
import cartModel from "./models/cart";
import productModel from "./models/product";

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

const syncDB = async () => {
  User.hasOne(Cart);
  Cart.belongsTo(User);

  await sequelize.sync();
  // const product = await Product.create({
  //   id: randomUUID(),
  //   title: "Pencil",
  //   description: "Just a pencil",
  //   price: 5,
  // });
  const product = await Product.findByPk(
    "51422fcd-0366-4186-ad5b-c23059b6f64f",
  );
  console.log(product.id);
  const user = await User.findByPk("0fe36d16-49bc-4aab-a227-f84df899a6cb");
  console.log(user.id);
  await Cart.destroy({ where: { id: "1434fec6-cd85-420d-95c0-eee2301a971d" } });
  const cart = await Cart.create({
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: user.id,
    isDeleted: false,
    items: [{ id: product.id, count: 2 }],
  });
  // console.log(cart);

  // const user = User.create({
  //   id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  // });
  console.log("DB is synchronized");
};

syncDB();

export { sequelize, checkDataBaseConnection, User, Cart, Product };
