// getFriends - Chris Miller
//Given an ative user - return an Array of the friends userIds

let getActiveUser = require("./getActiveUser")
const loadDB = require("../database")

const getFriends = function () {
    const activeUserId = getActiveUser().userId
    let friendslist = []

    loadDB(function(database){
        
        const friendTable = database.friends
        friendTable.forEach( obj => {
            if (obj.userId === activeUserId) {
                friendslist.push(obj.friendId)
            } else if (obj.friendId === activeUserId) {
                friendslist.push(obj.userId)}
        })  
    })

    return friendslist
}

module.exports = getFriends