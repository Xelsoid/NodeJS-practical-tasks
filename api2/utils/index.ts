import { NextFunction, Request, Response } from "express";
import { isUserExists } from "../servises/user.service";
import { returnUserCartData } from "../servises/cart.service";
import { METHOD } from "../constants/index.js";

export const logger = (req, res, next) => {
  console.log(`New request: ${req.method}, ${req.url}`);
  next();
};

export const validateCartRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.header("x-user-id");

  if (!userId) {
    res.status(403).send({
      data: null,
      error: {
        message: "You must be authorized user",
      },
    });
    return;
  }

  const isExistingUser = isUserExists(userId);
  if (!isExistingUser) {
    res.status(401).send({
      data: null,
      error: {
        message: "User is not authorized",
      },
    });
    return;
  }

  const isPUTMethod = req.method === METHOD.PUT;
  const productId = req.body?.productId;
  if (isPUTMethod && !productId) {
    res.status(400).send({
      data: null,
      error: {
        message: "Products are not valid",
      },
    });
    return;
  }

  const cart = returnUserCartData(userId);
  if (isPUTMethod && !cart) {
    // throw error?
    res.status(404).send({
      data: null,
      error: {
        message: "Cart was not found",
      },
    });
    return;
  }

  next();
};
