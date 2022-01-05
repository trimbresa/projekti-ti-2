const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class ItemRepository extends BaseRepository {
    async createItem(menuData) {
        const repository = await this.getRepository();
        const {item} = repository.models;
        const {category, name, description, price} = menuData;

        return await item.create({id: uuid(), category, name, description, price});
    }
}

module.exports = new ItemRepository();
