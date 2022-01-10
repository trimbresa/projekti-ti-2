import BaseService from "./base-service";

class MenuService extends BaseService {
    async fetchRestaurantMenus(restaurantId) {
        return (await this.apiGet(`/menus/${restaurantId}`))?.data || [];
    }

    async createMenu(newMenu) {
        return (await this.apiPost('/menu', newMenu))?.data || null;
    }

    async updateMenu(updatedMenu) {
        return (await this.apiPatch('/menu', updatedMenu))?.data || null;
    }

    async deleteMenu(menu) {
        return (await this.apiDelete('/menu', menu))?.data || [];
    }
}

export default new MenuService();
