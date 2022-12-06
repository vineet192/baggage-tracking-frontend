import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
const apiKey = "8398a0ad172442bf92056b57430d2463"
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

let baggage_id = sessionStorage.getItem("baggage_to_track")
let address = await getPersonAddress()
console.log(address)

document.getElementById("refresh").addEventListener("click", async (event) => {
    let baggage;

    try {
        baggage = await contract.methods.getBaggage(baggage_id).call()
    } catch (err) {
        console.error(err)
    }

    //Convert timestamps to string dates
    let timestampHistory = baggage.timestampHistory.map(time => (new Date(parseInt(time) * 1000)).toString())

    //Convert latitutde and longitude to formatted address
    let locationHistory = await Promise.all(baggage.locationHistory.map(async (location) => {
        let [lat, long] = location.split(";")

        let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=${apiKey}`
        let data;

        try {
            let response = await fetch(url)
            data = await response.json()
        } catch (err) {
            console.error(err)

        }

        return data.features[0].properties.formatted
    }))


    let table_body = document.getElementById("table-body")
    table_body.innerHTML = ''

    for (let i = 0; i < baggage.locationHistory.length; i++) {

        let tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${timestampHistory[i]}</td>
        <td>${locationHistory[i]}</td>
        `

        table_body.appendChild(tr)
    }
})

document.getElementById("reward").addEventListener("click", async (event) => {
    console.log("clicked reward")
    let rewardAmount = 10
    try {
        console.log("call to reward smart contract")
        await contract.methods.reward(rewardAmount).send({from: address, gas: 500000, gasLimit: 8000000})
    } catch (err) {
        console.error(err)
    }
})

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}