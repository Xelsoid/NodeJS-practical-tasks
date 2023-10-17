import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { CART_ENDPOINTS } from "./constants/index.js";
import { logger } from "./utils";
import {
  addToCartById,
  deleteCartById,
  getCartByID,
} from "./controllers/cart.controller";
import { placeOrderById } from "./controllers/order.controller";
import { validateCartRequest } from "./utils";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get(CART_ENDPOINTS.PROFILE_CART, validateCartRequest, getCartByID);

app.put(CART_ENDPOINTS.PROFILE_CART, validateCartRequest, addToCartById);

app.delete(CART_ENDPOINTS.PROFILE_CART, validateCartRequest, deleteCartById);

app.post(
  CART_ENDPOINTS.PROFILE_CART_CHECKOUT,
  validateCartRequest,
  placeOrderById,
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server is started");
});
