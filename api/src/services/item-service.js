const itemRepository = require('../repositories/item-repository');

class ItemService {
  async createItem(item) {
    return await itemRepository.createItem(item);
  }
}

module.exports = new ItemService();
