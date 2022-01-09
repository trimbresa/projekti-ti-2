const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class OrderRepository extends BaseRepository {
  async fetch(customerId) {
    const repository = await this.getRepository();
    const { order, orderItems, item } = repository.models;

    const allOrders = order.findAll({
      attributes: ['id', 'phone', 'status'],
      where: {
        customerId
      },
      include: [{
        model: orderItems,
        attributes: ['id', 'quantity'],
        include: {
            model: item,
            attributes: ['name', 'price', 'description', 'category']
        }
      }]
    })

    return allOrders;
  }

  async createOrder(customerId) {
    const repository = await this.getRepository();
    const { order } = repository.models;

    const createdOrder = await order.create({ id: uuid(), customerId });

    return createdOrder;
  }

  async getOrder(id) {
    const repository = await this.getRepository();
    const { order, menuItems, item, customer, orderItems } = repository.models;

    const foundOrder = await order.findOne({
      attributes: ['id', 'phone', 'status'],
      where: {
        id
      },
      include: [{
        model: orderItems,
        attributes: ['id'],
        // include: {
        //     model: item,
        //     attributes: ['name', 'price', 'description', 'category']
        // }
      }]
    });
    return foundOrder;
  }
}

module.exports = new OrderRepository()
