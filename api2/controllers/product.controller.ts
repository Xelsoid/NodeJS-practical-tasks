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
  const products = await returnProductsList();

  if (!products) {
    throw new Error("Internal Server error");
  }

  res.status(200).send({
    data: products,
  });
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
  const product = await returnProductById(productId);

  if (!product) {
    res.status(404).send({
      data: null,
      error: {
        message: `There is no product with id ${productId}`,
      },
    });
    return;
  }

  res.status(200).send({
    data: product,
  });
};
