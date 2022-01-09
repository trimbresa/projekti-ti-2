const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class OrderItemsRepository extends BaseRepository {
  async createOrderItem(orderData) {
    const repository = await this.getRepository();
    const { orderItems } = repository.models;
    const { orderId, itemId, quantity = 0 } = orderData;

    return await orderItems.create({ id: uuid(), orderId, itemId, quantity });
  }
}

module.exports = new OrderItemsRepository();
