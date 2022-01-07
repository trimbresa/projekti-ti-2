const menuItemsRepository = require('../repositories/menu-items-repository');
const menuRepository = require('../repositories/menu-repository');
const menuItemsService = require('./menu-items-service');

class MenuService {
    async fetchMenus(req, res) {
        const fetchedMenus = await menuRepository.fetch();
        return res.json({ data: fetchedMenus });
    }

    async getMenu(req, res) {
        const menuData = req.params;
        const fetchedMenu = await menuRepository.getMenu(menuData);
        return res.json({ data: fetchedMenu });
    }

    async createMenu(req, res) {
        const menuData = req.body;
        const createdMenu = await menuRepository.createMenu(menuData);
        await menuItemsService.createMenuItems(menuData.menuItems, createdMenu.id);
        const fetchedMenu = await menuRepository.getMenu(createdMenu.id);

        return res.json({ data: fetchedMenu });
    }

    async updateMenu(req, res) {
        const menuData = req.body;
        const updatedMenu = await menuRepository.updateMenu(menuData);
        const fetchedMenuItems = await menuItemsRepository.fetchMenuItems(updatedMenu.id);

        if (fetchedMenuItems.length === 0) {
            await menuItemsService.createMenuItems(menuData.menuItems, updatedMenu.id);
            const fetchedMenu = await menuRepository.getMenu(updatedMenu.id);

            return res.json({ data: fetchedMenu });
        }

        for (const existingMenuItem of fetchedMenuItems) {
            console.log(existingMenuItem.id)
            const matchedItem = menuData.menuItems.find(item => item?.id === existingMenuItem.id);
            if (!matchedItem) {
                await menuItemsRepository.deleteMenuItem(existingMenuItem);
                console.log('deleting menu item: ', existingMenuItem)
            } else if (matchedItem) {
                // await menuItemsRepository.updateItem(existingMenuItem.id);
            }
            // if(menuData.menuItems.find(item => item?.id !== existingMenuItem.id)) {
            //     await menuItemsRepository.deleteMenuItem(existingMenuItem.id);
            // }
        }
        await menuItemsService.createMenuItems(menuData.menuItems, updatedMenu.id);
        const fetchedMenu = await menuRepository.getMenu(updatedMenu.id);

        return res.json({ data: fetchedMenu });
    }

    async fetchRestaurantMenus(req, res) {
        const { restaurant_id } = req.params;
        const fetchedMenus = await menuRepository.fetchRestaurantMenus(restaurant_id);
        return res.json({ data: fetchedMenus });
    }

    async deleteMenu(req, res) {
        const { menuId } = req.body;
        await menuRepository.deleteMenu(menuId);
        return res.json({ data: true });
    }
}

module.exports = new MenuService();
