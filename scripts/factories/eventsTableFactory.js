// eventsTableFactory - Chris Miller
// returns new object for eventsTable

const loadDB = require("../database")
const setDatabase = require("../datasetter")
const getActiveUser = require("../auth/getActiveUser")

const eventsFactory = eventsInfoObject => {

    loadDB ( function(database) {
        
        let idValue = 0
        
        if (database.events.length > 0) {
            idValue = database.events[database.events.length - 1].id
        }
    
        return Object.create(null, {
            "id" : {value: ++idValue, enumerable: true, writable: true},
            "timeStamp" : {value: Date.now(), enumerable: true, writable: true},
            "userId" : {value: getActiveUser().userId, enumerable: true, writable: true},
            "name" : {value: eventsInfoObject.name, enumerable: true, writable: true},
            "eventDate" : {value: eventsInfoObject.eventDate, enumerable: true, writable: true},
            "location" : {value: eventsInfoObject.location, enumerable: true, writable: true},
            "save": {value: function () {
                database.events.push({
                    "id": this.id,
                    "timeStamp": this.timeStamp,
                    "userId": this.userId,
                    "name": this.name,
                    "eventDate": this.eventDate,
                    "location": this.location
                })
                setDatabase(database.events, "events")
                return this
            }}
        })
    })
}

module.exports = eventsFactory