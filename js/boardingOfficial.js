import app from '../js/static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

let boAddressArray = []
web3.eth.getAccounts().then(console.log)

//Make a function call to the smart contract to assign the specified address as a "baggage official"
document.getElementById("submitAddress").addEventListener('click', async (event) => {
    event.preventDefault()
    var boAddress = document.getElementById('boadd').value;
    let address = await getPersonAddress()
    contract.methods.assignBaggageOfficial([boAddress]).send({ from: address, gas: 500000, gasLimit: 8000000 }).then(console.log)
})

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}
