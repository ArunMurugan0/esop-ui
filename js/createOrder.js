
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
    }).catch(exceptionHandler)
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

function successHandler() {
    alert("Order Placed Successfully!")
}

function exceptionHandler(exception) {
    alert(exception.message)
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
    const esopType = formData.get('esopType')

    return {
        type,
        username,
        quantity,
        price,
        ...(esopType ? { esopType }: { })
    }
}




function formSubmitHandler(event) {
    event.preventDefault()
    const orderDetails = getOrderFormData(event.target)
    sendCreateOrderRequest(orderDetails)
}

const formID = "create-order-form"
const form = document.getElementById(formID)


const esopTypeContainer = document.getElementById("esop-type-container")

document.getElementById("order-type").addEventListener("change", (e) => {
    if (e.target.value == "SELL") {
        document.getElementById("non-performance-esop-type").removeAttribute("hidden")
        document.getElementById("performance-esop-type").removeAttribute("hidden")
        esopTypeContainer.classList.remove('hidden')
    } else {
        document.getElementById("non-performance-esop-type").setAttribute("hidden", true)
        document.getElementById("performance-esop-type").setAttribute("hidden", true)
        esopTypeContainer.classList.add('hidden')
    }
})

form.addEventListener("submit", formSubmitHandler)





