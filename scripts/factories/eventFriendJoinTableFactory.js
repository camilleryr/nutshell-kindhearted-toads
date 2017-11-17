// eventsJoin - Chris Miller
// returns new object for eventsTable

const loadDB = require("../database")
const setDatabase = require("../datasetter")
const getActiveUser = require("../auth/getActiveUser")

const eventsJoinFactory = eventJoinObject => {

    loadDB(function (database) {
    
        let idValue = 0
        
        if (database.eventJoin.length > 0) {
            idValue = database.eventJoin[database.eventJoin.length - 1].id
        }

        return Object.create(null, {
            "id" : {value: ++idValue, enumerable: true, writable: true},
            "timeStamp" : {value: Date.now(), enumerable: true, writable: true},
            "eventId" : {value: eventJoinObject.eventId, enumerable: true, writable: true},
            "userId" : {value: getActiveUser().userId, enumerable: true, writable: true},
            "save": {value: function () {
                database.eventJoin.push({
                    "id": this.id,
                    "timeStamp": this.timeStamp,
                    "userId": this.userId,
                    "eventId": this.eventId
                })
                setDatabase(database.eventJoin, "eventJoin")
                return this
            }}
        })
    })
}

module.exports = eventsJoinFactory