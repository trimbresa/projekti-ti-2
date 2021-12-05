const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Restaurant = (sequelize) => {
    sequelize.define('restaurant', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        restaurantName: DataTypes.STRING(255),
        pictureUrl: DataTypes.STRING(255),
    }, baseModel().options);
};

module.exports = Restaurant;
