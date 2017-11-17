// friends - Chris Miller
// returns new object for eventsTable

const loadDB= require("../database")
const setDatabase = require("../datasetter")
const getActiveUser = require("../auth/getActiveUser")

const friendsJoinTableFactory = friendObject => {

    loadDB(function(database) {
        let idValue = 0
        
        if (database.friends.length > 0) {
            idValue = database.friends[database.friends.length - 1].id
        }
    
        return Object.create(null, {
            "id" : {value: ++idValue, enumerable: true, writable: true},
            "timeStamp" : {value: Date.now(), enumerable: true, writable: true},
            "userId" : {value: getActiveUser().userId, enumerable: true, writable: true},
            "friendId" : {value: friendObject.friendId, enumerable: true, writable: true},
            "save": {value: function () {
                database.friends.push({
                    "id": this.id,
                    "userId": this.userId,
                    "timeStamp": this.timeStamp,
                    "userId": this.userId,
                    "friendId": this.friendId
                })
                setDatabase(database.friends, "friends")
                return this
            }}
        })
    })
}

module.exports = friendsJoinTableFactory