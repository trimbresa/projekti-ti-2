const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require('../config/constants');

const createJwtToken = async (data = {}) => {
    return await jwt.sign(data, JWT_PRIVATE_KEY);
}

const verifyJwtToken = async (token = '') => {
    return jwt.verify(token, JWT_PRIVATE_KEY);
}

module.exports = {
    createJwtToken,
    verifyJwtToken
}
