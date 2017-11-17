// Author: Sean Williams
//Purpose: Fill function that overwrites the default widget.fill()



const getUser = require("../auth/getActiveUser");
const getFriends = require("../auth/getFriends");


function fill(database) {
    const user = getUser()
    const friends = getFriends()
    news = database.news
        .filter(t => t.userId === user.userId || friends.includes(t.userId))
        .sort((f, s) => s.timeStamp - f.timeStamp);

    let domString = ""
    news.forEach(function (article) {
        if (article.userId === user.userId) {
            domString += `
            <div id=newsArticle_${article.id}>
                <p class="newsArticle__title">${article.title}</p>
                <p class="newsArticle__synopsis">${article.synopsis}</p>
                <p class="newsArticle__url"><a href="${article.url}" target="_blank">${article.url}</a></p>
                <button class='news__btn-delete'>Delete</button>
            </div>
            `
        } else {
            domString += `
            <div class="ownedByFriend">
                <p class="newsArticle__title">${article.title}</p>
                <p class="newsArticle__synopsis">${article.synopsis}</pv>
                <p class="newsArticle__url"><a href="${article.url}" target="_blank">${article.url}</a></p>
            </div>`
        }

    })
    this.container.innerHTML = domString
}

module.exports = fill