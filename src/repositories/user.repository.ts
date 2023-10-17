import { user } from "../data/user";
import { UserEntity } from "../schemas/user.entity";

export const findUserById = (currentUserId: string): UserEntity | null => {
  return user.find(({ id }) => id === currentUserId) || null;
};
