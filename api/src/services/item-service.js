const itemRepository = require('../repositories/item-repository');

class ItemService {
  async createItem(item) {
    return await itemRepository.createItem(item);
  }

  async getItem(id) {
    return await itemRepository.getItem(id);
  }
}

module.exports = new ItemService();
