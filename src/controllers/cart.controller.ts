import { Response, Request, NextFunction } from "express";
import {
  returnCartTotal,
  updateUserCart,
  returnUserCartData,
  deleteUserCart,
} from "../servises/cart.service";

export const getCartByID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userCart = returnUserCartData(req.header("x-user-id"));
  const cartTotal = returnCartTotal(userCart.items);

  if (!userCart || !cartTotal) {
    throw new Error("Internal Server error");
  }

  res.status(200).send({
    data: {
      cart: userCart,
      total: cartTotal,
    },
    error: null,
  });
};

export const addToCartById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const updatedCart = updateUserCart(req.header("x-user-id"), req.body);
  const cartTotal = returnCartTotal(updatedCart?.items);

  if (!updatedCart || !cartTotal) {
    throw new Error("Internal Server error");
  }

  res.status(200).send({
    data: {
      cart: updatedCart,
      total: cartTotal,
    },
    error: null,
  });
};

export const deleteCartById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const deletedCart = deleteUserCart(req.header("x-user-id"));

  if (!deletedCart || !deletedCart.isDeleted) {
    throw new Error("Internal Server error");
  }

  res.status(200).send({
    data: {
      success: deletedCart.isDeleted,
    },
    error: null,
  });
};
