import { NextFunction, Request, Response } from "express";
import { returnUserCartData } from "../servises/cart.service";
import { METHOD } from "../constants/index.js";

export const validateCart = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.header("x-user-id");
  const isPATCHMethod = req.method === METHOD.PATCH;

  const cart = returnUserCartData(userId);
  if (isPATCHMethod && !cart) {
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
