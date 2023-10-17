// import { Response, Request, NextFunction } from "express";
// import { createNewOrder } from "../servises/order.service";
//
// export const placeOrderById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const order = createNewOrder(req.header("x-user-id"));
//   if (!order) {
//     throw new Error("Internal Server error");
//   }
//
//   res.status(200).send({
//     data: { order },
//     error: null,
//   });
// };
