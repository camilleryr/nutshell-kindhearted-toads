// usersTableFactory - Chris Miller
// returns new object for usersTable

const loadDB = require("../database")
const setDatabase = require("../datasetter")

const userFactory = userObject => {

    loadDB(function(database){

        let idValue = 0
    
        if (database.users.length > 0) {
            idValue = database.users[database.users.length - 1].id
        }
    
        return Object.create(null, {
            "id" : {value: ++idValue, enumerable: true, writable: true},
            "timeStamp" : {value: Date.now(), enumerable: true, writable: true},
            "userName" : {value: userObject.userName, enumerable: true, writable: true},
            "email" : {value: userObject.email, enumerable: true, writable: true},
            "save": {value: function () {
                database.users.push({
                    "id": this.id,
                    "timeStamp": this.timeStamp,
                    "userName": this.userName,
                    "email": this.email
                })
                setDatabase(database.users, "users")
                return this
            }}
        })
    })
    

}

module.exports = userFactory