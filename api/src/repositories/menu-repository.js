const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class MenuRepository extends BaseRepository {
    async fetch() {
        const repository = await this.getRepository();
        const { menu } = repository.models;

        const allMenus = await menu.findAll({
            attributes: ['id']
        });

        return allMenus;
    }

    async getMenu(id) {
        const repository = await this.getRepository();
        const { menu, item } = repository.models;

        const foundMenu = await menu.findOne({
            attributes: ['id', 'name'],
            where: {
                id
            },
            include: {
                model: menuItems,
                attributes: ['id', 'itemId'],
                include: {
                    model: item,
                    attributes: ['name']
                }
            }
        });
        return foundMenu;
    }


    async fetchRestaurantMenus(restaurantId) {
        const repository = await this.getRepository();
        const { menu, menuItems, item } = repository.models;

        const allMenus = await menu.findAll({
            attributes: ['id', 'name'],
            where: {
                restaurantId
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

        return allMenus;
    }

    async createMenu(menuData) {
        const repository = await this.getRepository();
        const { menu } = repository.models;
        const { restaurantId, name } = menuData;

        return await menu.create({ id: uuid(), name, restaurantId });
    }
}

module.exports = new MenuRepository();
