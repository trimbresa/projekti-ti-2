const menuItemsRepository = require('../repositories/menu-items-repository');
const itemService = require('./item-service');

class MenuItemsService {
    async createMenuItems(menuItems, menuId) {
        for(const menuItem of menuItems) {
            if(!menuItem?.id) {
                const createdItem = await itemService.createItem(menuItem.item);
                const menuData = {itemId: createdItem.id, menuId}
                await menuItemsRepository.createMenuItems(menuData);
            }
        }
    }

    async updateMenuItems(menuItems, menuId) {
        for(const menuItem of menuItems) {
            const createdItem = await itemService.updateItem(menuItem.item);
            const menuData = {itemId: createdItem.id, menuId}
            await menuItemsRepository.updateMenuItems(menuData);
        }
    }

    async deleteMenuItems(menuItems, menuId) {
        for(const menuItem of menuItems) {
            const createdItem = await itemService.updateItem(menuItem.item);
            const menuData = {itemId: createdItem.id, menuId}
            await menuItemsRepository.updateMenuItems(menuData);
        }
    }
}

module.exports = new MenuItemsService();
