import BaseService from "./base-service";

class OrderService extends BaseService {
  async fetchCustomerOrders() {
    return (await this.apiGet('/order'))?.data;
  }

  async checkoutOrders(orderItems, restaurantId) {
    const ordersToCheckout = {
      restaurantId,
      orderItems: orderItems.map(orderItem => ({
        id: orderItem.itemDetails.item.id,
        quantity: orderItem.quantity
      }))
    }
    return (await this.apiPost('/order', ordersToCheckout))?.data || null;
  }

  async updateRestaurantOrder(orderItem) {
    return (await this.apiPatch('/order', orderItem))?.data || [];
  }

  async deleteOrder(orderId) {
    return (await this.apiDelete('/order', { orderId }))?.data || [];
  }
}

export default new OrderService();
