import { Sequelize } from "sequelize";
import employeeModel from "./models/employee";
import hardwareModel from "./models/hardware";
import userModel from "./models/users";
import cartModel from "./models/cart";

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

const Employee = employeeModel(sequelize);
const Hardware = hardwareModel(sequelize, Employee);
const User = userModel(sequelize);
const Cart = cartModel(sequelize, User);

const syncDB = async () => {
  // Employee.hasOne(Hardware);
  // Hardware.belongsTo(Employee, {
  //   foreignKey: {
  //     name: "employeeid",
  //   },
  // });

  User.hasOne(Cart);
  Cart.belongsTo(User);

  await sequelize.sync();

  const user = await User.findByPk("0fe36d16-49bc-4aab-a227-f84df899a6cb");
  console.log(user.id);
  await Cart.destroy({ where: { id: "1434fec6-cd85-420d-95c0-eee2301a971d" } });
  const cart = await Cart.create({
    id: "1434fec6-cd85-420d-95c0-eee2301a971d",
    userId: user.id,
    isDeleted: true,
  });
  console.log(cart);

  // const employee = await Employee.findByPk(1);
  // console.log(employee);
  // const hardware = await Hardware.findByPk("serialNum1");
  // console.log(hardware);
  // const user = Employee.build({
  //   id: 6,
  //   name: "Artsiom",
  //   joindate: Date.now(),
  // });
  // console.log(user instanceof Employee); // true
  // console.log(user); // "Jane"
  // console.log(user.toJSON()); // "Jane"
  // await user.save();
  // const user = User.create({
  //   id: "0fe36d16-49bc-4aab-a227-f84df899a6cb",
  // });
  console.log("DB is synchronized");
};

syncDB();

export { sequelize, checkDataBaseConnection, Employee, Hardware, User };
