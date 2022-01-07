const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class MenuRepository extends BaseRepository {
    async fetch() {
        const repository = await this.getRepository();
        const { menu } = repository.models;

        const allMenus = await menu.findAll({
            attributes: [
                'id',
            ],
        });

        return allMenus;
    }

    async getMenu(id) {
        const repository = await this.getRepository();
        const { menu, menuItems, item } = repository.models;

        const foundMenu = await menu.findOne({
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

    async updateMenu(menuData) {
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

    async deleteMenu(menuId) {
        const repository = await this.getRepository();
        const { menu } = repository.models;

        await menu.destroy({
            where: {
                id: menuId
            },
            cascade: true
        });

        return true;
    }
}

module.exports = new MenuRepository();
