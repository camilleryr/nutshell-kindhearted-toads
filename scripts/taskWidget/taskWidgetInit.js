/**
 * Krys Mathis
 * This init function:
 * 1. Create the overall structure for the task widget
 * 2. get the user data
 * 3. generate the individual tasks
 */

const getTasks = require("./getTasks");
const getUser = require("../auth/getActiveUser");
const generateTasks = require("./generateTasks");
const addEvents = require("./addListeners");
const loadDB = require("../database");
const {makeWidget, defaultWidget} = require("../widgetTemplate")

const taskWidget = makeWidget()

taskWidget.init = function() {

    //create new widget object

    // build up a dom string for the additional unique elements for this widget, such as input fields and buttons that will be placed under the nested widgetContainer
    let additionalElementDomString = "<button class='tasksWidget__btn-add'>Add</button>";

    // initialize new widget and pass in the name of the widget and the addition elements dom string
    defaultWidget.init("tasks", additionalElementDomString)

    // taskWidget enhancements
    taskWidget.widgetContainer = "tasksWidget";
    taskWidget.user = getUser()
    taskWidget.populate = generateTasks;
    taskWidget.populate = function() {
        loadDB( function (database) {
            generateTasks(getTasks(database));
        })
    }
    taskWidget.containerName = "tasksContainer";
    taskWidget.addEvents = addEvents;
    
    taskWidget.addEvents(taskWidget);
    taskWidget.populate()
 
}

module.exports = taskWidget;

