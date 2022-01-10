import BaseService from "./base-service";

class AuthService extends BaseService {
    async login(email, password) {
        return await this.apiPost('/login', { email, password });
    }

    async registerRestaurant(restaurant) {
        return await this.apiPost('/register/restaurant', restaurant);
    }

    async registerCustomer(email, password) {
        return await this.apiPost('/register/customer', { email, password });
    }
}

export default new AuthService();
