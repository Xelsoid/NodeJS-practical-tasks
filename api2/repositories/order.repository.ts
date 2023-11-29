import {Cart, CartItem, Product, User, Order, Payment, Delivery} from "../dbinit";

export const findOrderById = async (currentUserId: string) => await User.findByPk(currentUserId, {
  include: [{
    model: Order,
    include: [{
      model: Cart,
      include: [{
        model: CartItem,
        include:[{
          model: Product
        }]
      }]
    },
    {
      model: Payment,
    },
    {
      model: Delivery,
    }]
  }]
});
