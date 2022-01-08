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

    async getProfile(req, res) {
        const dataFromToken = await verifyJwtToken(req?.headers?.token ?? '');
        console.log(dataFromToken.id)
        const foundUser = await userRepository.getUser(dataFromToken.email);
        const foundRestaurant = await restaurantRepository.getByUserId(foundUser.id);
        if(foundRestaurant) {
            return res.json({ data: foundRestaurant })
        }
        // TODO
        // const foundCustomer = await customerRepository.getOne(dataFromToken.id);
        // if(foundRestaurant) {
        //     return res.json({ data: foundRestaurant })
        // }
        return res.status(404).json({ message: "Not found." });
    }
}

module.exports = new RestaurantService();
