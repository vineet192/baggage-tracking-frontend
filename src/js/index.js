import app from './static/env.js'

const web3 = new Web3(app.smartContractUrl)

let contract = new web3.eth.Contract([
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "baggageId",
                "type": "string"
            }
        ],
        "name": "addBaggageToBoarding",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "baggageId",
                "type": "string"
            }
        ],
        "name": "addBaggageToSecurity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "officials",
                "type": "address[]"
            }
        ],
        "name": "assignBaggageOffcial",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "baggageIds",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "locations",
                "type": "string[]"
            }
        ],
        "name": "checkInBaggage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string[]",
                "name": "customer_ids",
                "type": "string[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getBaggage",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "last_scanned_timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "enum BaggageTracker.BaggageStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct BaggageTracker.Baggage[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "baggageId",
                "type": "string"
            }
        ],
        "name": "getBaggageStatus",
        "outputs": [
            {
                "internalType": "enum BaggageTracker.BaggageStatus",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCustomers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "enum BaggageTracker.CustomerStatus",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct BaggageTracker.Customer[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
], "0xB9116249CD768b0ED7AEEBC9DdaE79a45b285eb6")

contract.methods.getCustomers().call().then(console.log)
contract.methods.getBaggage().call().then(console.log)
//uncomment this method after updating the abi
//contract.methods.isBoardingOfficial().call().then(console.log)
console.log(contract.methods)
console.log(contract)



async function connect() {
    if (typeof window.ethereum != undefined) {
        console.log("We can see Metamask")
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        console.log(user[0])
        //web3.eth.getAccounts().then(console.log)
    }
}

document.getElementById('connectbtn').addEventListener('click', () => {
    connect()
})

// async function execute() {
    
// }