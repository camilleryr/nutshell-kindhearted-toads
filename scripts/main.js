const getDatabase = require("./database")
const appInit = require("./auth/appInit")
const dbEventHandler = require("./dbEvent") // necessary to add the event listeners



// if(!getDatabase()){
//     const populateDB = require("./factories/populate_database")
//     populateDB()
// }

appInit();



