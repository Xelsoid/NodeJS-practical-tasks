import { findUserById } from "../repositories/user.repository";

export const isUserExists = (userId: string) => {
  return !!findUserById(userId);
};
