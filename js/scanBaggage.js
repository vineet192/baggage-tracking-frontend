import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)
var bagStatus = document.getElementById("status");

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
            contract.methods.checkInBaggage(baggageID, position).send({ from: "0x6286413Bf4dc570e7F0975A0644697c2E5601725", gas: 500000, gasLimit: 8000000 })
        }
    }
    else if (bagStatus.value === "security") {
        //Smart contract call to addBaggageToSecurity
        console.log("yes, this is security")

        if (position){
            console.log("call to sc")
            contract.methods.addBaggageToSecurity(baggageID, position).send({ from: "0x6286413Bf4dc570e7F0975A0644697c2E5601725", gas: 500000, gasLimit: 8000000 })
        }
    }

    else if (bagStatus.value === "boarded") {
        console.log("yes, this is boaridng")

        if (position){
            console.log("call to sc")
            contract.methods.addBaggageToBoarding(baggageID, position).send({ from: "0x6286413Bf4dc570e7F0975A0644697c2E5601725", gas: 500000, gasLimit: 8000000 })
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
