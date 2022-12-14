import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(Web3.givenProvider)
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

document.querySelector("form").addEventListener("submit", async (event) => {

    event.preventDefault();

    let baggageID = sessionStorage.getItem("scanned-baggage-id")
    let position = await getLocation()

    console.log(baggageID, position)

    if (bagStatus.value === "checkin") {

        //Smart contract call to checkInBaggage
        if (position) {
            console.log("call to checkin smart contract")
            await contract.methods.checkInBaggage(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }
    else if (bagStatus.value === "security") {

        //Smart contract call to addBaggageToSecurity
        if (position) {
            console.log("call to security smart contract")
            await contract.methods.addBaggageToSecurity(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }

    else if (bagStatus.value === "boarded") {

        //Smart contract call to addBaggageToBoarding
        if (position) {
            console.log("call to boarding smart contract")
            await contract.methods.addBaggageToBoarding(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }

    else if (bagStatus.value === "onroute") {
        console.log("yes, this is onroute")

        //Smart contract call to addBaggageToOnRoute
        if (position) {
            console.log("call to onboard smart contract")
            await contract.methods.addBaggageToOnRoute(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }
    else if (bagStatus.value === "delayed") {


        //Smart contract call to addBaggageToDelayed
        if (position) {
            console.log("call to delayed smart contract")
            await contract.methods.addBaggageToDelayed(baggageID, position).send({ from: address, gas: 500000, gasLimit: 8000000 })
        }
    }

    window.location.href = app.hostUrl + '/baggageOfficial.html'
})

//Use the geolocation api to get the user's current address
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