import BaseService from "./base-service";

class RestaurantService extends BaseService {
    async fetchRestaurants() {
        return (await this.apiGet('/restaurants'))?.data;
    }

    async getRestaurant(id) {
        return (await this.apiGet(`/restaurants/${id}`))?.data;
    }
}

export default new RestaurantService();
