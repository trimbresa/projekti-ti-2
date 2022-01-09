import BaseService from "./base-service";

class OrderService extends BaseService {
  async fetchCustomerOrders() {
    return (await this.apiGet('/order'))?.data;
  }

  async checkoutOrders(orderItems) {
    const ordersToCheckout = {
      orderItems: orderItems.map(orderItem => ({
        id: orderItem.itemDetails.item.id,
        quantity: orderItem.quantity
      }))
    }
    return (await this.apiPost('/order', ordersToCheckout))?.data || null;
  }
}

export default new OrderService();
