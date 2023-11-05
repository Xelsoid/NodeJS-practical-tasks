import { UserEntity } from "../schemas/user.entity";
import { User } from "../dbinit";

export const findUserById = async (
  currentUserId: string,
): Promise<UserEntity | null> => {
  const user = await User.findByPk(currentUserId);
  return user.id;
};
