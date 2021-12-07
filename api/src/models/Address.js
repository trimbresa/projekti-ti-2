const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Address = (sequelize) => {
    sequelize.define('address', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        country: DataTypes.STRING(255),
        city: DataTypes.STRING(255),
        location: DataTypes.STRING(100),
        zipCode: DataTypes.STRING(30),
    }, baseModel().options);
};

module.exports = Address;
