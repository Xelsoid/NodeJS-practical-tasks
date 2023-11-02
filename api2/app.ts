import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { CART_ENDPOINTS, PRODUCT_ENDPOINTS } from "./constants/index.js";
import {
  logger,
  validateAuthorization,
  validateProducts,
  validateCart,
} from "./utils";
import {
  addToCartById,
  deleteCartById,
  getCartByID,
} from "./controllers/cart.controller";
import { placeOrderById } from "./controllers/order.controller";
import {
  getProductById,
  getProductsList,
} from "./controllers/product.controller";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);

app.get(
  CART_ENDPOINTS.PROFILE_CART,
  validateAuthorization,
  validateCart,
  getCartByID,
);

app.patch(
  CART_ENDPOINTS.PROFILE_CART,
  validateAuthorization,
  validateCart,
  addToCartById,
);

app.delete(
  CART_ENDPOINTS.PROFILE_CART,
  validateAuthorization,
  validateCart,
  deleteCartById,
);

app.post(
  CART_ENDPOINTS.PROFILE_CART_CHECKOUT,
  validateAuthorization,
  placeOrderById,
);

app.get(
  PRODUCT_ENDPOINTS.PRODUCT,
  validateAuthorization,
  validateProducts,
  getProductsList,
);

app.get(
  `${PRODUCT_ENDPOINTS.PRODUCT}/:productId`,
  validateAuthorization,
  validateProducts,
  getProductById,
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({ message: err.message });
});

app.listen(3000, () => {
  console.log("Server is started");
});
