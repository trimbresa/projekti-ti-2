const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/user-repository');
const restaurantRepository = require('../repositories/restaurant-repository');
const customerRepository = require('../repositories/customer-repository');
const { createJwtToken, verifyJwtToken } = require("../utils/utils");

class CustomerService {
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
}

module.exports = new CustomerService();
