import {Op} from "sequelize";
import {CartItem, Product} from "../dbinit";


export const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

export const getProductById = async (productId: string) => {
  const product = await Product.findByPk(productId);
  return product;
};

export const findProductsByIds = async (productIds: string[]) => {
  const products = await Product.findAll({
    include: CartItem,
    where:
      {
        id: {
          [Op.or]: productIds
        }
      }
  }
  );
  return products;
};

export const findCartItem = async (cartId: string) => {
  const products = await CartItem.findAll({
    include: Product,
    where: {
      cartId
    }
  });
  return products;
};
