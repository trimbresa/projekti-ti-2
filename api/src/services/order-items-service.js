const orderItemsRepository = require('../repositories/order-items-repository');

class OrderItemsService {
    async createOrderItems(orderItems, orderId) {
        for (const orderItem of orderItems) {
            const orderData = { orderId, itemId: orderItem.id, quantity: orderItem.quantity };
            await orderItemsRepository.createOrderItem(orderData);
        }
    }
}

module.exports = new OrderItemsService();
