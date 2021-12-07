import BaseService from "./base-service";

class UserService extends BaseService {
    async getProfile() {
        return (await this.apiGet('/profile'))?.data;
    }

    async updateProfile(data) {
        return await this.apiPatch('/profile', data);
    }
}

export default new UserService();
