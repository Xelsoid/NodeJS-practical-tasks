import { NextFunction, Request, Response } from "express";
import { isUserExists } from "../servises/user.service";

export const validateAuthorization = (
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

  next();
};
