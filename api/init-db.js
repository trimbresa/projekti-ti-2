require('dotenv').config();
const {initDbConnection} = require("./src/utils/db-utils");

const initDb = async () => {
    try {
        await initDbConnection();
    } catch(error) {
        console.log(error);
        console.log("Failed to init DB.");
    }
}

initDb();
