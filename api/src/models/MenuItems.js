const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const MenuItems = (sequelize) => {
    sequelize.define('menuItems', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
    }, baseModel().options);
};

module.exports = MenuItems;
