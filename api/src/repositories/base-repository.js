const { Sequelize } = require('sequelize');
const { dbConfig } = require('../config/config');
const {dbConnection, initDbConnection} = require("../utils/db-utils");

class BaseRepository {
    entity = null;
    dbConnection = null;

    constructor(entity) {
        this.entity = entity;
    }

    async setDbConnection() {
        if(!this.dbConnection) {
            this.dbConnection = await initDbConnection();
        }
    }

    // async closeConnection() {
    //     await this.dbConnection.close();
    //     this.dbConnection = null;
    // }

    async getRepository() {
        return await initDbConnection();
    }
}

module.exports = BaseRepository;
