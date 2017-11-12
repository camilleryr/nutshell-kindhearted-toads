/**
 * Krys Mathis
 * Generate the mark-up for the task widget
 */

const taskData = [];
const userId = 1;
const {a, button, div, h1, header, p, span, article, input} = require("../domHelpers");

const createTaskStructure = function() {
    
    const taskWidget = document.querySelector(".tasksWidget");

    // Widget Header
    taskWidget.appendChild(
        header({"className": "tasksWidget_header"},"Tasks")
    );

    // Task container
    taskWidget.appendChild(
        div({"className": "taskContainer"},
            input({ "className": "tasksWidget__input", "type": "text" , "placeholder": "Enter task"}),
            button({"className": "tasksWidget__btnSubmit"},"Submit")
        )

    );


};

createTaskStructure();

module.exports = null;