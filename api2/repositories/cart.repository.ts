import {Cart, CartItem, Product, User} from "../dbinit";

const getActiveCart = (carts) => carts?.carts?.find(({isDeleted}) => !isDeleted);

export const findCartById = async (
  currentUserId: string,
  isDeleted = false,
) => {
  const cart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted },
  });
  return cart;
};

export const deleteCart = async (currentUserId: string) => {
  const currentCart = await Cart.findOne({
    where: { userId: currentUserId, isDeleted: false },
  });
  if (currentCart) {
    currentCart.isDeleted = true;
    await currentCart.save();
  }
  await currentCart.reload();
  return currentCart;
};

export const findCartsInDB = async (currentUserId: string) => {
  const userCarts = await User.findByPk(currentUserId, {
    include: [{
      model: Cart,
      include: [{
        model: CartItem,
        include:[{
          model: Product
        }]
      }]
    }]
  });
  return userCarts;
};

export const findActiveCart = async (currentUserId: string) => {
  const userCarts = await findCartsInDB(currentUserId);
  return getActiveCart(userCarts);
};
