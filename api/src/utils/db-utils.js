const {Sequelize, DataTypes} = require("sequelize");
const {dbConfig} = require("../config/config");
const Models = require("../models");

const dbConnection = () => new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
    host: dbConfig.DB_HOST,
    dialect: 'postgres'
});

const applyAssociations = (sequelize) => {
    const { user, customer, address, restaurant } = sequelize.models;

    // user to customer relations
    user.hasOne(customer, { foreignKey: { allowNull: false }});
    customer.belongsTo(user, { foreignKey: { allowNull: false }});

    // address to user relations
    address.hasOne(user);
    user.belongsTo(address, {
        foreignKey: {
            unique: true
        }
    });

    // user to restaurant relations
    user.hasOne(restaurant)
    restaurant.belongsTo(user)

    console.log('created associations')
}

const initDbConnection = async () => {
    const newDbConnection = dbConnection();
    await newDbConnection.authenticate();

    const allModels = Models;

    for(const model of allModels) {
        model(newDbConnection);
    }
    applyAssociations(newDbConnection);
    await newDbConnection.sync({ alter: true });
    return newDbConnection;
}

module.exports = {
    dbConnection,
    initDbConnection,
    applyAssociations
}