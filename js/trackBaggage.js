import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

let baggage_id = sessionStorage.getItem("baggage_to_track")
let address = await getPersonAddress()
console.log(address)

contract.methods.getBaggage(baggage_id).call().then(console.log)

document.getElementById("refresh").addEventListener("click", (event) => {
    console.log("Refresh")
})

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}