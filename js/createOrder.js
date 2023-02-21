
function sendCreateOrderRequest(orderDetails) {
    const {username, ...restOrderDetails} = orderDetails

    fetch(`http://127.0.0.1:8080/user/${username}/order`, {
        method: "POST",
        body: JSON.stringify(restOrderDetails),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    }).then(res => res.json()).then(res => {
        if(res.errors){
            errorHandler(res)
        }else{
            successHandler(res)
        }
    })
}
function addResponseLabelToResponseContainer(responseContainer, labelName, labelValue) {
    const label = document.createElement("label")
    label.innerText = labelName
    const labelData = document.createElement("label")
    labelData.innerText = labelValue
    const newline = document.createElement("br")
    responseContainer.append(label)
    responseContainer.append(labelValue)
    responseContainer.append(newline)
}

function successHandler(response) {
    const responseContainer = document.getElementById("response")
    while (responseContainer.hasChildNodes()){
       responseContainer.removeChild(responseContainer.firstChild)
    }
    const heading = document.createElement("h3")
    heading.innerText = "Response : "
    responseContainer.append(heading)

    addResponseLabelToResponseContainer(responseContainer, "Order ID : ",response["orderId"])
    addResponseLabelToResponseContainer(responseContainer, "Order Quantity : ",response["quantity"])
    addResponseLabelToResponseContainer(responseContainer, "Order Type : ",response["type"])
    addResponseLabelToResponseContainer(responseContainer, "Order Price : ",response["price"])
    if(response.esopType){
        addResponseLabelToResponseContainer(responseContainer, "Esop Type : ",response["esopType"])
    }
}

function errorHandler(errResponse) {
    const errorContainer = document.getElementById("response")
    while (errorContainer.hasChildNodes()){
       errorContainer.removeChild(errorContainer.firstChild)
    }
    const heading = document.createElement("h3")
    heading.innerText = "Errors : "
    const errorListContainer = document.createElement("ul")
    for(let i = 0; i < errResponse["errors"].length ; i++){
        const error = document.createElement("li")
        error.innerText = errResponse["errors"][i]
        errorListContainer.append(error)
    }
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





