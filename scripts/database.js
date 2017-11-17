// Author: Greg Lawrence
// Purpose: to retrieve database from local storage and return it.


function getDatabase (callBackFn) {

    // check if database exists in local storage and store in variable
    $.ajax({
        "url": "scripts/database.json",
        "method": "GET"
    }).then(function(database) {
        callBackFn(database)
    })

}

module.exports = getDatabase;