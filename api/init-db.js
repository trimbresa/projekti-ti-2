const {initDbTables} = require("./src/utils/db-utils");

const initDb = async () => {
    try {
        await initDbTables();
    } catch(error) {
        console.log(error);
        console.log("Failed to init DB.");
    }
}

initDb();
