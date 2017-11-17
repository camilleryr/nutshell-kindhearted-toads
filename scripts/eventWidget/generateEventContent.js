//Generate Event Content - Chris Miller
//take the filtered events and display them to the DOM

const generateEvents = function(events, database) {
    
    const container = document.querySelector(".eventsContainer");
    container.innerHTML = "";
    
    //filter events by date - screw you javascript
    events = events.sort((a,b) => b.upcoming-a.upcoming)
    events[events.length-1].style += " event--nextEvent"
    
    events.forEach(event => {
        
        //Check if the event is in the future
        if (event.display) {
            
            //Set default conditions
            let checked = ""
            let disabled = ""
            let statusElement = ""
            let status = `Created by ${getUserName(event.userId, database)}`
            
            //Set conditions if you are the event creator
            if (event.creator){
                let eventAttendees = getNumberOfAttendees(event.id, database)
                disabled = "disabled"
                statusElement = `<button class="event-delete event-delete__${event.id}">Delete</button>`
                status = `Creator - <strong style="font-size:.8em">${eventAttendees} Guests</strong>`
                checked = "checked"
                
                //Set conditions if you did not create the event
                //but are attending
            } else if (event.attending){
                checked = "checked"
                statusElement = "Attending : "
                
                //Set Conditions if a friend created the event and you are not attending
            } else {
                statusElement = "Attend? : "
            }
            
            
            //Set dataset of the node
            const newDiv = document.createElement("div")
            newDiv.className = `event  ${event.style}`
            newDiv.dataset.userId = event.userId
            newDiv.dataset.id = event.id
            newDiv.dataset.creator = event.creator
            newDiv.dataset.eventName = event.name
            newDiv.dataset.eventDate = event.eventDate
            newDiv.dataset.eventLocation = event.location
            newDiv.dataset.eventJoin = event.eventJoin
            
            //Add node to dom and write the inner HTML
            container.appendChild(newDiv)
            newDiv.innerHTML = `
            <span class="event__eventDetails">
            <p>${event.name}</p>
            <p>${event.location} -- ${event.eventDate}</p>
            </span>
            <span class="event__eventAttending">
            <p style="font-size:.7em">${status}</p>
            ${statusElement}
            <input type="checkbox" class="event-button__attending" ${disabled} ${checked}>
            </span>
            `
        }
    })
}

const getUserName = function(userId, database) {
    const  userTable = database.users
    let user = userTable.find(x => x.id === userId)
    return user.userName
}


const getNumberOfAttendees = function(eventId, database) {

    const  eventJoin = database.eventJoin
    return eventJoin.filter(x => x.eventId === eventId).length

}

module.exports = generateEvents;