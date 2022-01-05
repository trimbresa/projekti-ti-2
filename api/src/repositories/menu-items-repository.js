const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class MenuItemsRepository extends BaseRepository {
    async createMenuItems(menuData) {
        const repository = await this.getRepository();
        const {menuItems} = repository.models;
        const {menuId, itemId} = menuData;

        return await menuItems.create({id: uuid(), menuId, itemId});
    }
}

module.exports = new MenuItemsRepository();
