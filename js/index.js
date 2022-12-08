import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(Web3.givenProvider)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

web3.eth.getAccounts().then(console.log)

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
	let isBoardingOfficial;
	let isBaggageOfficial;
	let isCustomer;
	let address;
	let customerId;

	try {
		address = await getPersonAddress()
	} catch (err) {
		console.error(err);
		alert('Something went wrong fetching your address!')
		return
	}
	console.log("got the address", address, typeof (address))

	//Query smart contract to check whether current user is a boarding official
	try {
		isBoardingOfficial = await contract.methods.isBoardingOfficial().call({ from: address })
	} catch (err) {
		console.error(err)
	}

	if (isBoardingOfficial) {
		window.location.href = app.hostUrl + '/boardingOfficial.html'
	}

	//Query smart contract to check whether current user is a baggage official
	try {
		isBaggageOfficial = await contract.methods.isBaggageOfficial().call({ from: address })
	} catch (err) {
		console.error(err)
	}

	//Query the smart contract to check whether the current user is registered as a customer
	try {
		isCustomer = await contract.methods.isCustomer().call({ from: address })
	} catch (err) {
		console.log(err)
	}

	if (isBaggageOfficial) {
		window.location.href = app.hostUrl + '/baggageOfficial.html'
	}
	else if (isCustomer) {
		console.log("It's a customer")
		try {
			customerId = await contract.methods.getCustomerId().call({ from: address })
			let customerData = await getCustomer(customerId)
			console.log(customerData)
			sessionStorage.setItem("email", customerData.email)
			sessionStorage.setItem("name", customerData.name)
			window.location.href = app.hostUrl + '/enter_flight.html'

		} catch (err) {
			console.log(err)
		}
	}
	else {
		window.location.href = app.hostUrl + '/enter_flight.html'
	}
})


async function getCustomer(id) {
	let custData;
	try {
		let response = await fetch(app.serverUrl + `/get_customer?id=${id}`)
		custData = await response.json()
	} catch (err) {
		console.log(err)
	}
	return custData
}



