import app from '../js/static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

let boAddressArray = []
web3.eth.getAccounts().then(console.log)

document.getElementById("addAddress").addEventListener('click', (event) => {
    event.preventDefault()
    var boAddress = document.getElementById('boadd').value;
    console.log(boAddress)
    boAddressArray.push(boAddress)
    console.log(boAddressArray)
})

document.getElementById("submitAddress").addEventListener('click', async (event) => {
    event.preventDefault()
    let address = await getPersonAddress()
    contract.methods.assignBaggageOfficial(boAddressArray).send({from: address, gas: 500000, gasLimit: 8000000}).then(console.log)
})

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}