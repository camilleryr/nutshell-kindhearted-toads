// messageTableFactory - Chris Miller
// adds a recipient property if the message is a private message

const loadDB = require("../database")
const setDatabase = require("../datasetter")
const getActiveUser = require("../auth/getActiveUser")

const messageFactory = (messageObject, rcp = null) => {

    loadDB(function(database) {
    
        let idValue = 0
    
        if (database.messages.length > 0) {
            idValue = database.messages[database.messages.length - 1].id
        }
    
        if (rcp) {
            return Object.create(null, {
                "id": { value: messageObject.id || ++idValue, enumerable: true, writable: true },
                "timeStamp": { value: Date.now(), enumerable: true, writable: true },
                "userId": { value: getActiveUser().userId, enumerable: true, writable: true },
                "content": { value: messageObject.content, enumerable: true, writable: true },
                "rcp": {value: rcp, enumerable: true, writable: true},
                "save": {
                    value: function () {
                        database.messages.push({
                            "id": this.id,
                            "timeStamp": this.timeStamp,
                            "userId": this.userId,
                            "content": this.content,
                            "rcp": this.rcp
                        })
                        setDatabase(database.messages, "messages")
                        return this
                    }
                }
            })
        } else {
            return Object.create(null, {
                "id": { value: messageObject.id || ++idValue, enumerable: true, writable: true },
                "timeStamp": { value: Date.now(), enumerable: true, writable: true },
                "userId": { value: getActiveUser().userId, enumerable: true, writable: true },
                "content": { value: messageObject.content, enumerable: true, writable: true },
                "save": {
                    value: function () {
                        database.messages.push({
                            "id": this.id,
                            "timeStamp": this.timeStamp,
                            "userId": this.userId,
                            "content": this.content
                        })
                        setDatabase(database.messages, "messages")
                        return this
                    }
                }
            })
        }
        
    })

}


module.exports = messageFactory
