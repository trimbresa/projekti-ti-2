const restaurantRepository = require('../repositories/restaurant-repository');

class RestaurantService {
    async fetchRestaurants(req, res) {
        const fetchedRestaurants = await restaurantRepository.fetch();

        console.log(fetchedRestaurants);

        return res.json({ data: fetchedRestaurants });
    }

    async getRestaurant(req, res) {
        const { id = -1 } = req.params;
        const fetchedRestaurant = await restaurantRepository.getOne(id);

        if(!fetchedRestaurant) {
            return res.status(404).json({ data: null });
        }

        return res.json({ data: fetchedRestaurant });
    }
}

module.exports = new RestaurantService();
