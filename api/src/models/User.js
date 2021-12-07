const { DataTypes } = require('sequelize');

const baseModel = require('./BaseModel');

const User = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        firstName: DataTypes.STRING(255),
        lastName: DataTypes.STRING(255),
        dob: DataTypes.DATE,
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: DataTypes.STRING(255),
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, baseModel().options);
};

module.exports = User;
