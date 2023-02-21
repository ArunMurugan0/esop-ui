function sendOrderHistoryRequest(orderHistoryFormDetails) {
    const {username} = orderHistoryFormDetails
    fetch(`http://127.0.0.1:8080/user/${username}/orderHistory`, {
        method: "GET",
        headers: {
            "Accept" : "application/json"
        }
    }).then(res => res.json()).then(res => {
        if(res.errors){
            errorHandlerForOrderHistory(res)
        }else{
            successHandlerForOrderHistory(res)
        }
    })
}
function getOrderHisotryFormData(form) {
    const formData = new FormData(form)
    
    const username = formData.get('username')

    return {
        username
    }
}

function errorHandlerForOrderHistory(errResponse) {
    const errorContainer = document.getElementById("error-response-container")
    while (errorContainer.hasChildNodes()){
       errorContainer.removeChild(errorContainer.firstChild)
    }

    const errorListContainer = document.createElement("ul")
    for(let i = 0; i < errResponse["errors"].length ; i++){
        const error = document.createElement("li")
        error.innerText = errResponse["errors"][i]
        errorListContainer.append(error)
    }

    errorContainer.append(errorListContainer)
}

function successHandlerForOrderHistory(response){
    const ressponseContainer = document.getElementById("success-response-container")
    while (ressponseContainer.hasChildNodes()){
        ressponseContainer.removeChild(ressponseContainer.firstChild)
    }
    if(response.length == 0){
        const message = document.createElement("p")
        message.innerText = "No orders placed"
        ressponseContainer.append(message)
    }
    else{

    }
}

function orderHisotoryFormSubmitHandler(event) {
    event.preventDefault()
    const orderHistoryFormDetails = getOrderHisotryFormData(event.target)
    sendOrderHistoryRequest(orderHistoryFormDetails)
}

const formID = "order-history-form"
const form = document.getElementById(formID)

form.addEventListener("submit", orderHisotoryFormSubmitHandler)