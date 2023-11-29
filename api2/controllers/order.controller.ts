import { Response, Request, NextFunction } from "express";
import { createNewOrder } from "../servises/order.service";

export const placeOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const order = await createNewOrder(req.header("x-user-id"));
  if (!order) {
    throw new Error("Internal Server error");
  }
  console.log(order);
  res.status(201).send({
    data: { order },
  });
};
