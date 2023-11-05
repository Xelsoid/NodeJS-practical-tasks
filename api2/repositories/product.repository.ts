import { Product } from "../dbinit";

export const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

export const getProductById = async (productId: string) => {
  const product = await Product.findByPk(productId);
  return product;
};
