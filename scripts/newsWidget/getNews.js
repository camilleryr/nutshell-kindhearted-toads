// Author: Sean Williams
//Purpose: Get all news objects from the database


const getActiveUser = require("../auth/getActiveUser");
const getFriends = require("../auth/getFriends");

const getNews = function (database) {
    const user = getActiveUser()
    const friends = getFriends()

    let news = database.news
    return news
        .filter(t => t.userId === user.userId || friends.includes(t.userId))
        .sort((f, s) => s.timeStamp - f.timeStamp);
}

module.exports = getNews;