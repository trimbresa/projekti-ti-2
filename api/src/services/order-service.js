const customerRepository = require('../repositories/customer-repository');
const orderRepository = require('../repositories/order-repository');
const { verifyJwtToken } = require('../utils/utils');
const orderItemsService = require('./order-items-service');

class OrderService {
    async fetchOrders(req, res) {
        const tokenData = await verifyJwtToken(req?.headers?.token ?? '');
        const foundCustomer = await customerRepository.getOne(tokenData.id);

        if (foundCustomer.customer) {
            const fetchedOrders = await orderRepository.fetch(foundCustomer.customer.id);
            return res.json({ data: fetchedOrders });
        }

        return res.status(403).json({ "message": "Unauthorized!" })
    }

    async createOrder(req, res) {
        const orderData = req.body;

        const tokenData = await verifyJwtToken(req?.headers?.token ?? '');
        const foundCustomer = await customerRepository.getOne(tokenData.id);

        if (foundCustomer.customer) {
            const createdOrder = await orderRepository.createOrder(foundCustomer.customer.id);
            await orderItemsService.createOrderItems(orderData.orderItems, createdOrder.id);
            const fetchedOrder = await orderRepository.getOrder(createdOrder.id);
            return res.json({ data: fetchedOrder });
        }

        return res.status(403).json({ "message": "Unauthorized!" })
    }

    async deleteOrder(req, res) {
        const { orderId } = req.body;

        const tokenData = await verifyJwtToken(req?.headers?.token ?? '');
        const foundCustomer = await customerRepository.getOne(tokenData.id);

        const orderToDelete = await orderRepository.getOrderWithCustomer(orderId);
        if (!orderToDelete) {
            return res.status(404).json({ "message": "Not found!" })
        }

        if (orderToDelete.customerId === foundCustomer?.customer?.id) {
            await orderRepository.deleteOrder(orderId);
            return res.json({ data: true });
        }

        return res.status(403).json({ "message": "Unauthorized!" });
    }
}

module.exports = new OrderService();
