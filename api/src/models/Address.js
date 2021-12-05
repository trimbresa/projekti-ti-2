const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Address = (sequelize) => {
    sequelize.define('address', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        country: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        price: DataTypes.DOUBLE,
    }, baseModel().options);
};

module.exports = Address;
