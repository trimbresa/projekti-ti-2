import BaseService from "./base-service";

class MenuService extends BaseService {
    async fetchRestaurantMenus(restaurantId) {
        return (await this.apiGet(`/menus/${restaurantId}`))?.data || [];
    }
}

export default new MenuService();
