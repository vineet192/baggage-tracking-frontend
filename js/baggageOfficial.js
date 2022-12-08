import QrScanner from '../js/qr-code-scanner/qr-scanner-min.js';
import app from '../js/static/env.js'
import smartContract from './static/smartContractEnv.js'

const web3 = new Web3(Web3.givenProvider)
let contract = new web3.eth.Contract(smartContract.abi, smartContract.address)

let videoElem = document.querySelector("video")
const qrScanner = new QrScanner(videoElem, result => {

    console.log('decoded qr code:', result)

    sessionStorage.setItem("scanned-baggage-id", result.trim())

    window.location.href = app.hostUrl + "/scanBaggage.html"

    qrScanner.stop();
});

document.getElementById('balancebtn').addEventListener('click', async () => {
    let balance = ""
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
        balance = await contract.methods.getBalance().call({ from: address })
    } catch (err) {
        console.error(err)
    }

    document.getElementById("balance").innerText = `BGLY Balance:${balance}`
})

document.getElementById("start_scan").addEventListener('click', (event) => {
    qrScanner.start();
})

async function getPersonAddress() {
    if (typeof window.ethereum != undefined) {
        let user = await ethereum.request({ method: "eth_requestAccounts" });
        return user[0]
    }
}
