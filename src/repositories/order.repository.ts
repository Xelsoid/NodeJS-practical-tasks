import { order } from '../data/order'
import { OrderEntity } from "../schemas/order.entity";

export const findOrderById = (currentUserId: string): OrderEntity | null => {
    return order.find(({ userId }) => userId === currentUserId) || null;
}
