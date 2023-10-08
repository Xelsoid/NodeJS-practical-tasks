import {CartEntity, CartItemEntity} from "../schemas/cart.entity";
import {findCartById, findProductById, createProduct, updateProduct} from '../repositories/cart.repository'

export const returnUserCartData = (currentUserId: string): Omit<CartEntity, "userId" | "isDeleted"> => {
    const currentCart = findCartById(currentUserId);
    if(!currentCart) return null;

    const cart = {...currentCart}
    delete cart?.userId;
    delete cart?.isDeleted;
    return cart;
}

export const returnCartTotal = (items: CartItemEntity[]): number => {
    return items.reduce((acc, item) => {
        return acc + item.product.price * item.count
    }, 0)
}

export const updateUserCart = (currentUserId: string, product) => {
    const { productId, count, title, description, price } = product;
    const existingProduct = findProductById(currentUserId, productId);

    if(existingProduct && count) {
        existingProduct.count = count
        return updateProduct(currentUserId, existingProduct);
    }

    if(!existingProduct && title && description && price && count && productId) {
        //create new product
        const product = {
            product: {
                id: productId,
                title,
                description,
                price,
            },
            count,
        }
        return createProduct(currentUserId, product);
    }

    return null;
}
