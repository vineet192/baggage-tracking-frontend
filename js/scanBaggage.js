import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)
var bagStatus = document.getElementById("status");

let address = await getPersonAddress()
console.log(address)

function onChange() {
    var value = bagStatus.value;
    console.log(value);
}

bagStatus.onchange = onChange;
onChange();

document.getElementById("scannedBaggage").addEventListener("click", async (event) => {
    getLocation()
    let baggageID = sessionStorage.getItem("scanned-baggage-id")
    let position = await getLocation()
    
    console.log(baggageID, position)

    if (bagStatus.value === "checkin") {
        //Smart contract call to checkInBaggage
        console.log("yes, this is checkin")
        
        if (position) {
            console.log("call to sc")
            contract.methods.checkInBaggage(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }
    else if (bagStatus.value === "security") {
        //Smart contract call to addBaggageToSecurity
        console.log("yes, this is security")

        if (position){
            console.log("call to sc")
            contract.methods.addBaggageToSecurity(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }

    else if (bagStatus.value === "boarded") {
        console.log("yes, this is boaridng")

        if (position){
            console.log("call to sc")
            contract.methods.addBaggageToBoarding(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }
})

function getLocation() {
    if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(`${position.coords.latitude};${position.coords.longitude}`),
                error => reject(error)
            )
        })
    } else {
        console.log("Geolocation is not supported by this browser.");
        return null;
    }
}

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}