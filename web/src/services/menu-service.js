import BaseService from "./base-service";

class MenuService extends BaseService {
    async fetchRestaurantMenus(restaurantId) {
        return (await this.apiGet(`/menus/${restaurantId}`))?.data || [];
    }

    async createMenu(newMenu) {
        return (await this.apiPost('/menu', newMenu))?.data || [];
    }

    async deleteMenu(newMenu) {
        return (await this.apiDelete('/menu', newMenu))?.data || [];
    }
}

export default new MenuService();
