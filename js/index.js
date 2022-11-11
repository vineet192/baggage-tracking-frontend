import app from './static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(app.smartContractUrl)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

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
	let isBoardingOfficial;
	let isBaggageOfficial;
	let address;

	try {
		address = await getPersonAddress()
	} catch (err) {
		console.error(err);
		alert('Something went wrong fetching your address!')
		return
	}
	console.log("got the address", address, typeof (address))

	try {
		isBoardingOfficial = await contract.methods.isBoardingOfficial().call({ from: address })
	} catch (err) {
		console.error(err)
	}

	if (isBoardingOfficial) {
		window.location.href = app.hostUrl + '/boardingOfficial.html'
	}

	try {
		isBaggageOfficial = await contract.methods.isBaggageOfficial().call({ from: address })
	} catch (err) {
		console.error(err)
	}

	if(isBaggageOfficial){
		window.location.href = app.hostUrl + '/baggageOfficial.html'
	}
	else{
		window.location.href = app.hostUrl + '/login.html'
	}
})



