import app from './static/env.js'

let email = JSON.parse(sessionStorage.getItem("creds")).email
let flight_no = sessionStorage.getItem("flight_no")
let data = await getCustomerBaggage(email, flight_no)

let list = document.getElementById("myList");

data.forEach((item) => {
    let li = document.createElement("li");
    li.innerText = item.name;
    list.appendChild(li);

    //Track Button
    let trackButton = document.createElement("button");
    trackButton.innerHTML = "Track";

    trackButton.addEventListener('click', (event) => {
        sessionStorage.setItem('baggage_to_track', item.baggage_id)
        window.location.href = app.hostUrl + '/trackBaggage.html'
    })

    //Show QR button
    let qrButton = document.createElement("button");
    qrButton.innerHTML = "Show QR";

    qrButton.addEventListener('click', (event) => {
        sessionStorage.setItem('baggage_to_track', item.baggage_id)
        window.location.href = app.hostUrl + '/qrCode.html'
    })

    li.appendChild(trackButton);
    li.appendChild(qrButton);
});

document.getElementById("addbaggage").addEventListener('click', (event) => {
    event.preventDefault()
    window.location.href = app.hostUrl + "/addBaggageForm.html"
})

async function getCustomerBaggage(email, flight_no) {
    let response = await fetch(app.serverUrl + `/get_baggage?email=${email}&flight_no=${flight_no}`)
    let data = await response.json()
    return data
}