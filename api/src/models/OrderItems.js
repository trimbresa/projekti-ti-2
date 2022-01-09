const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const OrderItems = (sequelize) => {
    sequelize.define('orderItems', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        quantity: DataTypes.INTEGER
    }, baseModel().options);
};

module.exports = OrderItems;