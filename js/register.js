import app from './static/env.js'
import smartContract from './static/smartContractEnv.js';

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

async function registerCustomer() {
    //get the name and email from input text field
    var name = document.getElementById('uname').value;
    var email = document.getElementById('email').value;

    //Add the customer to the flight.
    let flight_no = sessionStorage.getItem("flight_no")
    
    let customer_id = await addCustomer(name, email, flight_no)

    if (!customer_id) {
        alert("Something went wrong!")
        return;
    }

    sessionStorage.setItem("name", name)
    sessionStorage.setItem("email", email)

    let address = await getPersonAddress()

    let result = await contract.methods.addCustomer(customer_id).send({ from: address, gas: 500000, gasLimit: 8000000 })

    console.log(result)
    window.location.href = app.hostUrl + "/customer.html"

}

document.querySelector("form").addEventListener('submit', async (event) => {
    event.preventDefault()
    await registerCustomer()
    window.location.href = app.hostUrl + "/customer.html"
})

async function addCustomer(name, email, flight_no) {

    let data = {
        name: name,
        email: email,
        flight_no: flight_no
    }

    let response;

    try {
        response = await fetch(app.serverUrl + '/add_customer', {
            method: "POST", headers: {
                'Content-type': 'application/json   '
            },
            body: JSON.stringify(data)
        })
    } catch (err) {
        console.error(err)
        return null
    }

    if (response.status == 200) {
        let customer_id = (await response.json()).customer_id
        return customer_id
    }
    return false
}

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}

