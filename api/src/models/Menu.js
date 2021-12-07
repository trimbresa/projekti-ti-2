const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const Menu = (sequelize) => {
    sequelize.define('menu', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        name: DataTypes.STRING(255),
    }, baseModel().options);
};

module.exports = Menu;
