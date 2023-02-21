
function sendCreateOrderRequest(orderDetails) {
    const {username, ...restOrderDetails} = orderDetails

    fetch(`http://127.0.0.1:8080/user/${username}/order`, {
        method: "POST",
        body: JSON.stringify(restOrderDetails),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    }).then(res => res.json()).then(console.log).catch(errorHandler)
}

function successHandler(response) {

}

function errorHandler(errResponse) {
    const errorContainer = document.getElementById("errors")
    const heading = document.createElement("h3")
    heading.innerText = "Errors : "
    const errorListContainer = document.createElement("ul")
    for(let i = 0; i < errResponse["error"].length; i++){
        const error = document.createElement("li")
        error.innerText = errResponse["error"][i]
        errorListContainer.append(error)
    }
    console.log(heading)
    console.log(errorListContainer)
    errorContainer.append(heading)
    errorContainer.append(errorListContainer)
}


function getOrderFormData(form) {
    const formData = new FormData(form)

    const username = formData.get('username')
    const type = formData.get('orderType')
    const quantity = parseInt(formData.get('orderQuantity'))
    const price = parseInt(formData.get('orderPrice'))

    return {
        type,
        username,
        quantity,
        price
    }
}


function formSubmitHandler(event) {
    event.preventDefault()
    const orderDetails = getOrderFormData(event.target)
    sendCreateOrderRequest(orderDetails)
}

const formID = "create-order-form"
const form = document.getElementById(formID)

form.addEventListener("submit", formSubmitHandler)





