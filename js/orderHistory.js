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

function createHeaders(table){
    const tr = table.insertRow()
    const headers = ["Order ID","Order Type", "Order Quantity", "Order Price", "Order Status","Order Execution History", "Remaining Quantity"]
    for(let i = 0; i < headers.length; i++){
        const td = tr.insertCell()
        td.appendChild(document.createTextNode(headers[i]))
    }
}

function addDataToRow(tr,data){
    const td = tr.insertCell()
    td.appendChild(document.createTextNode(String(data)))
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
        const table = document.createElement("table")
        createHeaders(table)
        for(let i = 0; i < response.length; i++){
            const tr = table.insertRow()
            const quantity = response[i]["quantity"]
            addDataToRow(tr,response[i]["orderId"])
            addDataToRow(tr,quantity)
            addDataToRow(tr,response[i]["type"])
            addDataToRow(tr,response[i]["price"])
            addDataToRow(tr,response[i]["status"])
            const filledOrders = response[i]["filled"]
            const td = tr.insertCell()
            let remainingQuantity = quantity
            for(let j = 0; j < filledOrders.length; j++){
                const filledOrderTable = document.createElement("table")
                const filledOrderTableHeaders = ["Quantity", "Price"]
                const filledOrderTableHeaderRow = filledOrderTable.insertRow()
                for(let k = 0; k < filledOrderTableHeaders.length; k++){
                    const td1 = filledOrderTableHeaderRow.insertCell()
                    td1.appendChild(document.createTextNode(filledOrderTableHeaders[k]))
                }
                const filledOrderTableDataRow = filledOrderTable.insertRow()
                const executedQuantity = filledOrders[j]["quantity"]
                remainingQuantity = remainingQuantity - executedQuantity
                addDataToRow(filledOrderTableDataRow, executedQuantity)
                addDataToRow(filledOrderTableDataRow, filledOrders[j]["amount"])
                td.appendChild(filledOrderTable)
            }
            addDataToRow(tr,remainingQuantity)
        }

        ressponseContainer.append(table)
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