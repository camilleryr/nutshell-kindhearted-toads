// Author: Sean Williams
//Purpose: Create the news widget and set up its inital state





const {makeWidget, defaultWidget} = require("../widgetTemplate")
const getUser = require("../auth/getActiveUser")
const fillFunc = require("./fill")
// const getNews = require("./getNews")
const addEvents = require("./eventListeners");
const loadDB = require("../database");
const getActiveUser = require("../auth/getActiveUser");
const getFriends = require("../auth/getFriends");


const newsWidget = makeWidget()


newsWidget.init = function () {
    //create new widget object

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer

    let additionalElementDomString = "<button class='newsWidget__btn-add'>New Article</button>";

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("news", additionalElementDomString)
    newsWidget.container = document.querySelector(".newsContainer")
    newsWidget.user = getUser();
    // newsWidget.getNews = getNews;
    newsWidget.fill = fillFunc
    newsWidget.populate = function () {

        loadDB(database => {
            this.fill(database)
        })
    }
    newsWidget.populate()
    addEvents(newsWidget)
}


module.exports = newsWidget