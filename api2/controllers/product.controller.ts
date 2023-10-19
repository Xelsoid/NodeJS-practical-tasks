import { Response, Request, NextFunction } from "express";
import {
  returnProductById,
  returnProductsList,
} from "../servises/product.service";

export const getProductsList = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const products = returnProductsList();

  if (!products.length) {
    throw new Error("Internal Server error");
  }

  res.status(200).send({
    data: products,
    error: null,
  });
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const product = returnProductById(productId);

  if (!product) {
    res.status(404).send({
      data: null,
      error: {
        message: "No product with such id",
      },
    });
    return;
  }

  res.status(200).send({
    data: product,
    error: null,
  });
};
