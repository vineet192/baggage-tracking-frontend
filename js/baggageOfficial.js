import QrScanner from '../js/qr-code-scanner/qr-scanner-min.js';
import app from '../js/static/env.js'

let videoElem = document.querySelector("video")
const qrScanner = new QrScanner(videoElem, result => { 
    
    console.log('decoded qr code:', result) 

    sessionStorage.setItem("scanned-baggage-id", result.trim())

    window.location.href = app.hostUrl + "/scanBaggage.html"

    qrScanner.stop();
});

document.getElementById("start_scan").addEventListener('click', (event) => {
    qrScanner.start();
})
