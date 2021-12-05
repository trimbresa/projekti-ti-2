const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const User = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        role: DataTypes.STRING(20),
        firstName: DataTypes.STRING(255),
        lastName: DataTypes.STRING(255),
        dob: DataTypes.DATE,
        email: DataTypes.STRING(255),
        password: DataTypes.STRING(255),
        active: DataTypes.BOOLEAN,
    }, baseModel().options);
};

module.exports = User;
