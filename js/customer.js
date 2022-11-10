import app from './static/env.js'

let data = ["SkyBag", "Vip", "American tourister", "wildcraft"];

let list = document.getElementById("myList");

data.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
    var trackButton = document.createElement("button");
    trackButton.innerHTML = "Track";
    var qrButton = document.createElement("button");
    qrButton.innerHTML = "Show QR";
    li.appendChild(trackButton);
    li.appendChild(qrButton);
});

document.getElementById("addbaggage").addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = app.hostUrl + "/addBaggageForm.html"
})