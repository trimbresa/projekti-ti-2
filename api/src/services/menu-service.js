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
