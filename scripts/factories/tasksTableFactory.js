// tasksTableFactory - Chris Miller
// returns new object for tasksTableFactory

const loadDB = require("../database")
const setDatabase = require("../datasetter")
const getActiveUser = require("../auth/getActiveUser")

const taskFactory = taskObject => {

    loadDB(function(database){

        let idValue = 0
    
        if (database.tasks.length > 0) {
            idValue = database.tasks[database.tasks.length - 1].id
        }
    
        return Object.create(null, {
            "id" : {value: ++idValue, enumerable: true, writable: true},
            "timeStamp" : {value: Date.now(), enumerable: true, writable: true},
            "userId" : {value: getActiveUser().userId, enumerable: true, writable: true},
            "taskName" : {value: taskObject.taskName, enumerable: true, writable: true},
            "completionDate" : {value: taskObject.completionDate, enumerable: true, writable: true},
            "completed" : {value: taskObject.completed, enumerable: true, writable: true},
            "save": {value: function () {
                database.tasks.push({
                    "id": this.id,
                    "timeStamp": this.timeStamp,
                    "userId": this.userId,
                    "taskName": this.taskName,
                    "completionDate": this.completionDate,
                    "completed": this.completed
                })
                setDatabase(database.tasks, "tasks")
                return this
            }}
        })
    })
}

module.exports = taskFactory