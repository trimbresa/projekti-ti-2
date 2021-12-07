const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Item = (sequelize) => {
    sequelize.define('item', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        category: DataTypes.STRING(255),
        name: DataTypes.STRING(255),
        description: DataTypes.STRING(255),
        price: DataTypes.INTEGER,
    }, baseModel().options);
};

module.exports = Item;
