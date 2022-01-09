const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/user-repository');
const restaurantRepository = require('../repositories/restaurant-repository');
const customerRepository = require('../repositories/customer-repository');
const { createJwtToken, verifyJwtToken } = require("../utils/utils");

class UserService {
    async login(req, res) {
        const { email = '', password = '' } = req.body;
        const foundUser = await userRepository.getUser(email);

        if (!foundUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const token = await this.makeAuth(email, password);

        if (token) {
            return res.json({ token })
        }

        return res.status(403).send('Unauthorized');
    }

    async makeAuth(email, password) {
        const foundUser = await userRepository.getUser(email);
        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            return await createJwtToken({ id: foundUser.id, email: foundUser.email });
        }

        return null;
    }

    async registerRestaurant(req, res) {
        const salt = await bcrypt.genSalt(10);

        const userData = req.body;
        userData.password = await bcrypt.hash(userData.password, salt);

        const createdUser = await userRepository.createUser(userData);
        await restaurantRepository.createRestaurant(createdUser.id, userData);

        const token = await createJwtToken({ id: createdUser.id, email: createdUser.email });

        return await res.json({ token });
    }

    async registerCustomer(req, res) {
        const salt = await bcrypt.genSalt(10);

        const userData = req.body;
        const newUserData = {
            ...userData
        }
        newUserData.password = await bcrypt.hash(userData.password, salt);

        const createdUser = await userRepository.createUser(newUserData);
        await customerRepository.createCustomer(createdUser.id);

        const token = await createJwtToken({ id: createdUser.id, email: createdUser.email });

        return await res.json({ token });
    }

    async getProfile(req, res) {
        const dataFromToken = await verifyJwtToken(req?.headers?.token ?? '');
        const foundUser = await userRepository.getUser(dataFromToken.email);

        const foundRestaurant = await restaurantRepository.getByUserId(foundUser.id);
        if (foundRestaurant) {
            return res.json({ data: foundRestaurant })
        }

        const foundCustomer = await customerRepository.getOne(dataFromToken.id);
        if (foundCustomer) {
            return res.json({ data: foundCustomer })
        }

        return res.status(404).json({ message: "Not found." });
    }

    async updateProfile(req, res) {
        const tokenData = await verifyJwtToken(req?.headers?.token ?? '');
        const foundUser = await userRepository.getUser(tokenData.email);
        const foundRestaurant = await restaurantRepository.getByUserId(foundUser.id);

        console.log(foundUser.id)
        const userBaseData = {
            id: foundUser.id,
            firstName: req?.body?.firstName || foundUser.firstName,
            lastName: req?.body?.lastName || foundUser.lastName,
        }

        await userRepository.updateUser(userBaseData);

        if (foundRestaurant) {
            const userRestaurantData = {
                ...req.body,
                id: foundRestaurant.id
            }
            await restaurantRepository.updateRestaurant(userRestaurantData);
            const updatedUser = await this.getProfile(req, res)
            return res.json({ data: updatedUser })
        }

        const foundCustomer = await customerRepository.getOne(foundUser.id);
        if (foundCustomer) {
            const userCustomerData = {
                ...req.body,
                id: foundCustomer.customer.id
            }
            await customerRepository.updateCustomer(userCustomerData);
            const updatedUser = await this.getProfile(req, res)
            return res.json({ data: updatedUser })
        }

        return res.status(404).json({ message: "Not found." });
    }
}

module.exports = new UserService();
