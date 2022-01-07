const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class MenuItemsRepository extends BaseRepository {
    async createMenuItems(menuData) {
        const repository = await this.getRepository();
        const { menuItems } = repository.models;
        const { menuId, itemId } = menuData;

        return await menuItems.create({ id: uuid(), menuId, itemId });
    }

    async fetchMenuItems(menuId) {
        const repository = await this.getRepository();
        const { menuItems, item } = repository.models;

        return await menuItems.findAll({
            attributes: ['id', 'menuId', 'itemId'],
            include: {
                model: item,
                attributes: ['id', 'name', 'price', 'description', 'category']
            },
            where: { menuId }
        });
    }

    async updateMenuItem(menuData) {
        const repository = await this.getRepository();
        const { menu, menuItems, item } = repository.models;
        const { name, id } = menuData;

        await menu.update({ name }, {
            where: {
                id
            }
        });

        return await menu.findOne({
            attributes: ['id', 'name'],
            where: {
                id
            },
            include: [{
                model: menuItems,
                attributes: ['id'],
                include: {
                    model: item,
                    attributes: ['name', 'price', 'description', 'category']
                }
            }]
        });
    }

    async deleteMenuItem(existingMenuItem) {
        const repository = await this.getRepository();
        const { item } = repository.models;
        
        await item.destroy({
            where: {
                id: existingMenuItem.itemId
            },
            cascade: true
        });

        return true;
    }
}

module.exports = new MenuItemsRepository();
