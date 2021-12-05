const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Customer = (sequelize) => {
    sequelize.define('customer', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        avatarUrl: DataTypes.STRING(255),
    }, baseModel().options);
};

module.exports = Customer;
