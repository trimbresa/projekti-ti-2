const { DataTypes } = require('sequelize');
const { orderStatus } = require('../config/constants');

const baseModel = require('./BaseModel');

const Order = (sequelize) => {
    sequelize.define('order', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: orderStatus.OPEN
        },
        phone: DataTypes.STRING(255)
    }, baseModel().options);
};

module.exports = Order;