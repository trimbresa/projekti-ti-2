const menuItemsRepository = require('../repositories/menu-items-repository');
const itemService = require('./item-service');

class MenuItemsService {
    async createMenuItems(menuItems, menuId) {
        for(const item of menuItems) {
            const createdItem = await itemService.createItem(item);
            const menuData = {itemId: createdItem.id, menuId}
            await menuItemsRepository.createMenuItems(menuData);
        }
    }
}

module.exports = new MenuItemsService();
