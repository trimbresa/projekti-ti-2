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

    // async updateMenu(req, res) {
    //     const menuData = req.body;
    //     const updatedMenu = await menuRepository.updateMenu(menuData);
    //     const fetchedMenuItems = await menuItemsRepository.fetchMenuItems(updatedMenu.id);

    //     if (fetchedMenuItems.length === 0) {
    //         await menuItemsService.createMenuItems(menuData.menuItems, updatedMenu.id);
    //         const fetchedMenu = await menuRepository.getMenu(updatedMenu.id);
    //         return res.json({ data: fetchedMenu });
    //     }

    //     for (const existingMenuItem of fetchedMenuItems) {
    //         const matchedItem = menuData.menuItems.find(item => item?.id === existingMenuItem.id);
    //         if (!matchedItem) {
    //             await menuItemsRepository.deleteMenuItem(existingMenuItem);
    //         }
    //     }

    //     await menuItemsService.createMenuItems(menuData.menuItems, updatedMenu.id);
    //     const fetchedMenu = await menuRepository.getMenu(updatedMenu.id);

    //     return res.json({ data: fetchedMenu });
    // }

    // async fetchRestaurantMenus(req, res) {
    //     const { restaurant_id } = req.params;
    //     const fetchedMenus = await menuRepository.fetchRestaurantMenus(restaurant_id);
    //     return res.json({ data: fetchedMenus });
    // }

    // async deleteMenu(req, res) {
    //     const { menuId } = req.body;
    //     await menuRepository.deleteMenu(menuId);
    //     return res.json({ data: true });
    // }
}

module.exports = new OrderService();
