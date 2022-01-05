const BaseRepository = require("./base-repository");
const uuid = require('uuid').v4;

class UserRepository extends BaseRepository {
    async createRestaurant(userId, newRestaurant) {
        const repository = await this.getRepository();
        const {restaurant} = repository.models;
        const {restaurantName, pictureUrl = ''} = newRestaurant;

        return await restaurant.create({id: uuid(), restaurantName, pictureUrl, userId});
    }

    async fetch() {
        const repository = await this.getRepository();
        const {restaurant} = repository.models;

        const allRestaurants = await restaurant.findAll({
            attributes: ['restaurantName', 'id', 'pictureUrl']
        });

        return allRestaurants;
    }

    async getOne(id) {
        const repository = await this.getRepository();
        const {restaurant, menu} = repository.models;

        const foundItem = await restaurant.findOne({
            where: {
                id
            },
            attributes: ['restaurantName', 'id', 'pictureUrl'],
            include: {
                model: menu,
                attributes: ['id', 'name']
            }
        });

        return foundItem;
    }

    async getByUserId(userId) {
        const repository = await this.getRepository();
        const {restaurant, user} = repository.models;

        const foundItem = await restaurant.findOne({
            where: {
                userId
            },
            attributes: ['restaurantName', 'id', 'pictureUrl'],
            include: {
                model: user,
                attributes: ['firstName', 'lastName', 'dob', 'email']
            }
        });

        return foundItem;
    }

    async updateRestaurant(newData) {
        const repository = await this.getRepository();
        const {restaurant} = repository.models;
        const updatedRestaurant = await restaurant.update(
                newData,
                {
                    where: {
                        id: newData.id
                    }
                }
            )
        ;

        return updatedRestaurant;
    }
}

module.exports = new UserRepository();
