import { NextFunction, Request, Response } from "express";
import { METHOD } from "../constants/index.js";

export const validateProducts = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isPATCHMethod = req.method === METHOD.PATCH;
  const productId = req.body?.productId;

  if (isPATCHMethod && !productId) {
    res.status(400).send({
      data: null,
      error: {
        message: "Products are not valid",
      },
    });
    return;
  }

  next();
};
