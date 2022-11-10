import app from './static/env.js'

const web3 = new Web3(app.smartContractUrl)

let contract = new web3.eth.Contract([
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
		"name": "assignBaggageOfficial",
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
	},
	{
		"inputs": [],
		"name": "isBaggageOfficial",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isBoardingOfficial",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0xD8c1782AB57Dde0354943114B526dEBBfcBd8ff7")

web3.eth.getAccounts().then(console.log)
contract.methods.getCustomers().call().then(console.log)
contract.methods.getBaggage().call().then(console.log)

async function connect() {
	if (typeof window.ethereum != undefined) {
		console.log("We can see Metamask Wallet")
		let user = await ethereum.request({ method: "eth_requestAccounts" });
		console.log(user)
	}
}

async function getPersonAddress() {
	if (typeof window.ethereum != undefined) {
		let user = await ethereum.request({ method: "eth_requestAccounts" });
		return user[0]
	}
}

document.getElementById('connectbtn').addEventListener('click', async () => {
	await connect()

	getPersonAddress().then((address) => {
		console.log("got the address", address, typeof (address))
		contract.methods.isBoardingOfficial().call({ from: address })
			.then(isOfficial => {
				console.log("IsOfficial : ", isOfficial)

				if (isOfficial) {
					window.location.href = app.hostUrl + "/boardingOfficial.html"
				}
				else {
					window.location.href = app.hostUrl + "/login.html"
				}
			})
	})

})



